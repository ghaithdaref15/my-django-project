import sympy as sp
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sv_ttk
import re
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np
import os
import json
from datetime import datetime

class EquationSolver:
    def __init__(self, root):
        self.root = root
        self.root.title("Advanced Equation Solver")
        self.root.geometry("1000x700")
        self.root.minsize(800, 600)
        
        # Setup theme
        self.current_theme = "dark"
        sv_ttk.set_theme(self.current_theme)
        
        # Variable to track if equation has been plotted
        self.equation_plotted = False
        
        # Create UI components
        self.setup_ui()
        
        # History of solutions
        self.history = []
        
        # Load history from file if exists
        self.load_history()
        
        # Set up keyboard shortcuts
        self.setup_shortcuts()
    
    def setup_ui(self):
        # Main frame using grid layout for better responsiveness
        main_frame = ttk.Frame(self.root, padding=20)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Configure grid weights
        main_frame.columnconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        
        # Create left and right frames
        left_frame = ttk.Frame(main_frame)
        left_frame.grid(row=0, column=0, sticky="nsew", padx=(0, 10))
        
        right_frame = ttk.Frame(main_frame)
        right_frame.grid(row=0, column=1, sticky="nsew", padx=(10, 0))
        
        # Equation input section
        input_frame = ttk.LabelFrame(left_frame, text="Equation Input", padding=10)
        input_frame.pack(fill=tk.BOTH, expand=False, pady=(0, 10))
        
        # Equation format selector
        format_frame = ttk.Frame(input_frame)
        format_frame.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(format_frame, text="Equation Format:").pack(side=tk.LEFT)
        
        self.format_var = tk.StringVar(value="Standard Form")
        format_combo = ttk.Combobox(format_frame, textvariable=self.format_var, 
                                    values=["Standard Form", "Factored Form", "Expanded Form"])
        format_combo.pack(side=tk.LEFT, padx=(10, 0))
        format_combo.bind("<<ComboboxSelected>>", self.update_example)
        
        # Equation input
        ttk.Label(input_frame, text="Enter Equation:").pack(anchor=tk.W)
        self.equation_var = tk.StringVar()
        equation_entry = ttk.Entry(input_frame, textvariable=self.equation_var, width=50)
        equation_entry.pack(fill=tk.X, pady=10)
        
        # Example label
        self.example_var = tk.StringVar(value="Example: x**4 + 2*x**3 - 3*x**2 + 4*x - 5 = 0")
        example_label = ttk.Label(input_frame, textvariable=self.example_var, font=("Arial", 9))
        example_label.pack(anchor=tk.W)
        
        # Button frame
        button_frame = ttk.Frame(input_frame)
        button_frame.pack(fill=tk.X, pady=10)
        
        # Solve button
        solve_btn = ttk.Button(button_frame, text="Solve Equation", command=self.solve_equation)
        solve_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Plot button
        plot_btn = ttk.Button(button_frame, text="Plot Equation", command=self.plot_equation)
        plot_btn.pack(side=tk.LEFT, padx=5)
        
        # Clear button
        clear_btn = ttk.Button(button_frame, text="Clear Input", command=self.clear_input)
        clear_btn.pack(side=tk.LEFT, padx=5)
        
        # Results section
        results_frame = ttk.LabelFrame(left_frame, text="Results", padding=10)
        results_frame.pack(fill=tk.BOTH, expand=True)
        
        # Results text widget with scrollbar
        result_scroll = ttk.Scrollbar(results_frame)
        result_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.result_text = tk.Text(results_frame, height=15, width=50, yscrollcommand=result_scroll.set)
        self.result_text.pack(fill=tk.BOTH, expand=True)
        result_scroll.config(command=self.result_text.yview)
        
        # Right side - contains plot and history
        
        # Plot frame
        self.plot_frame = ttk.LabelFrame(right_frame, text="Equation Visualization", padding=10)
        self.plot_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        # Initially show a message
        self.plot_message = ttk.Label(self.plot_frame, 
                                     text="Click 'Plot Equation' to visualize the function", 
                                     font=("Arial", 11))
        self.plot_message.pack(expand=True)
        
        # History frame
        history_frame = ttk.LabelFrame(right_frame, text="Solution History", padding=10)
        history_frame.pack(fill=tk.BOTH, expand=False)
        
        # History controls
        history_controls = ttk.Frame(history_frame)
        history_controls.pack(fill=tk.X, pady=(0, 5))
        
        ttk.Label(history_controls, text="Recent Equations:").pack(side=tk.LEFT)
        
        # Export history button
        export_btn = ttk.Button(history_controls, text="Export History", command=self.export_history)
        export_btn.pack(side=tk.RIGHT)
        
        # Clear history button
        clear_history_btn = ttk.Button(history_controls, text="Clear History", command=self.clear_history)
        clear_history_btn.pack(side=tk.RIGHT, padx=(0, 5))
        
        # History listbox with scrollbar
        history_scroll = ttk.Scrollbar(history_frame)
        history_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.history_listbox = tk.Listbox(history_frame, height=6, yscrollcommand=history_scroll.set)
        self.history_listbox.pack(fill=tk.BOTH, expand=True, padx=(0, 5))
        history_scroll.config(command=self.history_listbox.yview)
        self.history_listbox.bind("<<ListboxSelect>>", self.load_history_item)
        
        # Status bar
        self.status_var = tk.StringVar(value="Ready")
        status_bar = ttk.Label(main_frame, textvariable=self.status_var, relief=tk.SUNKEN, anchor=tk.W)
        status_bar.grid(row=1, column=0, columnspan=2, sticky="ew", pady=(10, 0))
        
        # Bottom button frame
        bottom_button_frame = ttk.Frame(main_frame)
        bottom_button_frame.grid(row=2, column=0, columnspan=2, sticky="ew", pady=(10, 0))
        
        # Toggle theme button
        theme_btn = ttk.Button(bottom_button_frame, text="Toggle Theme", command=self.toggle_theme)
        theme_btn.pack(side=tk.LEFT)
        
        # Copy results button
        copy_btn = ttk.Button(bottom_button_frame, text="Copy Results", command=self.copy_results)
        copy_btn.pack(side=tk.LEFT, padx=(5, 0))
        
        # Exit button
        exit_btn = ttk.Button(bottom_button_frame, text="Exit", command=self.root.destroy)
        exit_btn.pack(side=tk.RIGHT)
    
    def update_example(self, event=None):
        selected_format = self.format_var.get()
        
        if selected_format == "Standard Form":
            self.example_var.set("Example: x**4 + 2*x**3 - 3*x**2 + 4*x - 5 = 0")
        elif selected_format == "Factored Form":
            self.example_var.set("Example: (x-1)*(x+2)*(x**2+3) = 0")
        elif selected_format == "Expanded Form":
            self.example_var.set("Example: x**4 + 2*x**3 - 3*x**2 + 4*x - 5")
    
    def solve_equation(self):
        eq_str = self.equation_var.get().strip()
        
        if not eq_str:
            messagebox.showwarning("Input Error", "Please enter an equation")
            return
        
        try:
            self.status_var.set("Solving equation...")
            self.root.update_idletasks()
            
            # Parse the equation based on the selected format
            x = sp.Symbol('x')
            eq_format = self.format_var.get()
            
            # Handle both forms with and without "= 0"
            if "=" in eq_str:
                left_side, right_side = eq_str.split("=", 1)
                left_expr = sp.sympify(left_side.strip())
                right_expr = sp.sympify(right_side.strip())
                equation = left_expr - right_expr
            else:
                equation = sp.sympify(eq_str)
            
            # Solve the equation
            solutions = sp.solve(equation, x)
            
            # Display results
            self.result_text.delete(1.0, tk.END)
            equation_tex = sp.latex(equation)
            self.result_text.insert(tk.END, f"Equation: {eq_str}\n\n")
            self.result_text.insert(tk.END, f"Standardized form: {equation} = 0\n\n")
            self.result_text.insert(tk.END, "Solutions:\n")
            
            if not solutions:
                self.result_text.insert(tk.END, "No solutions found.\n")
            else:
                for i, sol in enumerate(solutions):
                    # Format complex solutions nicely
                    if sol.is_real:
                        self.result_text.insert(tk.END, f"x{i+1} = {float(sol):.6f}\n")
                    else:
                        sol_complex = complex(sol.evalf())
                        real_part = sol_complex.real
                        imag_part = sol_complex.imag
                        self.result_text.insert(tk.END, f"x{i+1} = {real_part:.6f} {'+' if imag_part >= 0 else '-'} {abs(imag_part):.6f}i\n")
            
            # Add factored form if possible
            try:
                factored = sp.factor(equation)
                if factored != equation:
                    self.result_text.insert(tk.END, f"\nFactored form: {factored} = 0\n")
            except:
                pass
            
            # Add degree of the equation
            degree = sp.degree(equation, gen=x)
            self.result_text.insert(tk.END, f"\nDegree of equation: {degree}\n")
            
            # Add to history
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            history_item = {
                "equation": eq_str,
                "solutions": [str(sol) for sol in solutions],
                "timestamp": timestamp
            }
            self.history.append(history_item)
            self.history_listbox.insert(0, f"{timestamp}: {eq_str}")
            
            # Save history to file
            self.save_history()
            
            self.status_var.set(f"Solved equation: {len(solutions)} solution(s) found")
            
        except Exception as e:
            messagebox.showerror("Error", f"Error solving equation: {str(e)}\n\nMake sure your equation is in the correct format.")
            self.status_var.set("Error solving equation")
    
    def plot_equation(self):
        eq_str = self.equation_var.get().strip()
        
        if not eq_str:
            messagebox.showwarning("Input Error", "Please enter an equation")
            return
        
        try:
            self.status_var.set("Plotting equation...")
            self.root.update_idletasks()
            
            # Parse the equation
            x_sym = sp.Symbol('x')
            
            # Handle both forms with and without "= 0"
            if "=" in eq_str:
                left_side, right_side = eq_str.split("=", 1)
                left_expr = sp.sympify(left_side.strip())
                right_expr = sp.sympify(right_side.strip())
                equation = left_expr - right_expr
            else:
                equation = sp.sympify(eq_str)
            
            # Convert to lambda function
            f = sp.lambdify(x_sym, equation, "numpy")
            
            # Clear previous plot
            if hasattr(self, 'canvas'):
                self.canvas.get_tk_widget().destroy()
            
            if hasattr(self, 'plot_message'):
                self.plot_message.destroy()
                
            # Create plot
            fig, ax = plt.subplots(figsize=(5, 4), dpi=100)
            
            # Find roots for better plotting range
            roots = sp.solve(equation, x_sym)
            root_vals = [complex(root.evalf()).real for root in roots if complex(root.evalf()).real != float('inf') and not sp.im(root.evalf()).is_nonzero]
            
            if root_vals:
                min_root = min(root_vals)
                max_root = max(root_vals)
                x_range = max(5, (max_root - min_root) * 1.5)
                x_min = min_root - x_range/3
                x_max = max_root + x_range/3
            else:
                x_min, x_max = -10, 10
            
            x = np.linspace(x_min, x_max, 1000)
            
            # Evaluate the function, handling potential errors
            y = np.zeros_like(x)
            for i, x_val in enumerate(x):
                try:
                    y_val = f(x_val)
                    if isinstance(y_val, complex):
                        y[i] = float('nan')  # Skip complex values
                    elif abs(y_val) > 1000:
                        y[i] = float('nan')  # Skip very large values that would distort the plot
                    else:
                        y[i] = y_val
                except:
                    y[i] = float('nan')
            
            # Plot the function
            ax.plot(x, y, 'b-', label=f'f(x) = {equation}')
            
            # Mark the roots
            for root in roots:
                root_val = complex(root.evalf()).real
                if not sp.im(root.evalf()).is_nonzero and x_min <= root_val <= x_max:
                    try:
                        ax.plot(root_val, 0, 'ro', markersize=6, label=f'Root: x = {root_val:.4f}')
                    except:
                        pass
            
            # Add x-axis (y=0)
            ax.axhline(y=0, color='k', linestyle='-', alpha=0.3)
            
            # Add grid and labels
            ax.grid(True, linestyle='--', alpha=0.7)
            ax.set_xlabel('x')
            ax.set_ylabel('f(x)')
            ax.set_title(f'Plot of {equation} = 0')
            
            # Adjust legend if there are too many roots
            if len(roots) > 5:
                ax.legend(loc='upper right', fontsize='small')
            else:
                ax.legend(loc='best')
            
            # Create canvas
            self.canvas = FigureCanvasTkAgg(fig, master=self.plot_frame)
            self.canvas.draw()
            self.canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)
            
            # Add toolbar
            from matplotlib.backends.backend_tkagg import NavigationToolbar2Tk
            toolbar_frame = ttk.Frame(self.plot_frame)
            toolbar_frame.pack(fill=tk.X)
            toolbar = NavigationToolbar2Tk(self.canvas, toolbar_frame)
            toolbar.update()
            
            self.equation_plotted = True
            self.status_var.set("Equation plotted successfully")
            
        except Exception as e:
            messagebox.showerror("Error", f"Error plotting equation: {str(e)}")
            self.status_var.set("Error plotting equation")
    
    def load_history_item(self, event):
        selection = self.history_listbox.curselection()
        if selection:
            # Convert index to actual history index (reversed because newest is at top)
            index = len(self.history) - 1 - selection[0]
            history_item = self.history[index]
            
            # Set equation
            self.equation_var.set(history_item["equation"])
            
            # Display results
            self.result_text.delete(1.0, tk.END)
            self.result_text.insert(tk.END, f"Equation: {history_item['equation']}\n\n")
            self.result_text.insert(tk.END, "Solutions:\n")
            
            for i, sol in enumerate(history_item["solutions"]):
                self.result_text.insert(tk.END, f"x{i+1} = {sol}\n")
            
            self.status_var.set(f"Loaded equation from history: {history_item['timestamp']}")
    
    def clear_input(self):
        self.equation_var.set("")
        self.status_var.set("Input cleared")
    
    def clear_history(self):
        if self.history and messagebox.askyesno("Confirm", "Are you sure you want to clear all history?"):
            self.history = []
            self.history_listbox.delete(0, tk.END)
            self.save_history()
            self.status_var.set("History cleared")
    
    def copy_results(self):
        result_text = self.result_text.get(1.0, tk.END)
        self.root.clipboard_clear()
        self.root.clipboard_append(result_text)
        self.status_var.set("Results copied to clipboard")
    
    def export_history(self):
        if not self.history:
            messagebox.showinfo("Info", "No history to export")
            return
            
        try:
            filename = filedialog.asksaveasfilename(
                defaultextension=".json",
                filetypes=[("JSON Files", "*.json"), ("Text Files", "*.txt"), ("All Files", "*.*")],
                title="Export History"
            )
            
            if not filename:
                return  # User cancelled
                
            if filename.endswith('.json'):
                with open(filename, 'w') as f:
                    json.dump(self.history, f, indent=2)
            else:
                # Export as formatted text
                with open(filename, 'w') as f:
                    f.write("Equation Solver History\n")
                    f.write("======================\n\n")
                    
                    for item in self.history:
                        f.write(f"Date: {item['timestamp']}\n")
                        f.write(f"Equation: {item['equation']}\n")
                        f.write("Solutions:\n")
                        
                        for i, sol in enumerate(item['solutions']):
                            f.write(f"  x{i+1} = {sol}\n")
                        
                        f.write("\n" + "-"*40 + "\n\n")
            
            self.status_var.set(f"History exported to {os.path.basename(filename)}")
            
        except Exception as e:
            messagebox.showerror("Error", f"Error exporting history: {str(e)}")
    
    def save_history(self):
        try:
            # Save only the most recent 50 items
            history_to_save = self.history[-50:] if len(self.history) > 50 else self.history
            with open("equation_history.json", "w") as f:
                json.dump(history_to_save, f)
        except Exception as e:
            print(f"Error saving history: {e}")
    
    def load_history(self):
        try:
            if os.path.exists("equation_history.json"):
                with open("equation_history.json", "r") as f:
                    self.history = json.load(f)
                    
                # Populate the history listbox (most recent first)
                for item in reversed(self.history):
                    self.history_listbox.insert(tk.END, f"{item['timestamp']}: {item['equation']}")
        except Exception as e:
            print(f"Error loading history: {e}")
    
    def toggle_theme(self):
        # Toggle between light and dark theme
        self.current_theme = "light" if self.current_theme == "dark" else "dark"
        sv_ttk.set_theme(self.current_theme)
        
        # Update plot colors if there's a plot
        if self.equation_plotted:
            self.plot_equation()
            
        self.status_var.set(f"Theme changed to {self.current_theme}")
    
    def setup_shortcuts(self):
        # Set up keyboard shortcuts
        self.root.bind("<F5>", lambda e: self.solve_equation())
        self.root.bind("<F6>", lambda e: self.plot_equation())
        self.root.bind("<F1>", lambda e: self.show_help())
        self.root.bind("<Control-c>", lambda e: self.copy_results())
        self.root.bind("<Control-s>", lambda e: self.export_history())
        self.root.bind("<Control-l>", lambda e: self.clear_input())
        self.root.bind("<Escape>", lambda e: self.root.destroy())
    
    def show_help(self):
        help_text = """
        Advanced Equation Solver Help
        
        Input Formats:
        - Standard Form: x**4 + 2*x**3 - 3*x**2 + 4*x - 5 = 0
        - Factored Form: (x-1)*(x+2)*(x**2+3) = 0
        - Expanded Form: x**4 + 2*x**3 - 3*x**2 + 4*x - 5
        
        Keyboard Shortcuts:
        F1 - Show this help
        F5 - Solve Equation
        F6 - Plot Equation
        Ctrl+C - Copy Results
        Ctrl+S - Export History
        Ctrl+L - Clear Input
        Esc - Exit
        
        Tips:
        - Use ** for exponentiation (x**2 for x²)
        - Mathematical functions like sin(), cos(), exp() are supported
        - You can include or omit "= 0" in your equation
        """
        
        help_window = tk.Toplevel(self.root)
        help_window.title("Equation Solver Help")
        help_window.geometry("600x400")
        
        help_frame = ttk.Frame(help_window, padding=20)
        help_frame.pack(fill=tk.BOTH, expand=True)
        
        help_scroll = ttk.Scrollbar(help_frame)
        help_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        help_text_widget = tk.Text(help_frame, wrap=tk.WORD, yscrollcommand=help_scroll.set)
        help_text_widget.pack(fill=tk.BOTH, expand=True)
        help_text_widget.insert(tk.END, help_text)
        help_text_widget.config(state=tk.DISABLED)
        
        help_scroll.config(command=help_text_widget.yview)
        
        close_button = ttk.Button(help_window, text="Close", command=help_window.destroy)
        close_button.pack(pady=10)

def main():
    root = tk.Tk()
    app = EquationSolver(root)
    root.mainloop()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Error starting application: {e}")
        print("Make sure you have the required libraries installed:")
        print("pip install sympy matplotlib sv_ttk")