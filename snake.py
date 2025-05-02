import pygame
import random
import time
import os
import json
from pygame import mixer

# Initialize Pygame and mixer
pygame.init()
mixer.init()

# Game constants
WIDTH = 800
HEIGHT = 600
BLOCK_SIZE = 20
GRID_WIDTH = WIDTH // BLOCK_SIZE
GRID_HEIGHT = HEIGHT // BLOCK_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
DARK_GREEN = (0, 100, 0)
YELLOW = (255, 255, 0)
PURPLE = (128, 0, 128)
GRAY = (50, 50, 50)
LIGHT_GRAY = (100, 100, 100)

# Initialize screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Advanced Snake Game")
icon = pygame.Surface((32, 32))
icon.fill(GREEN)
pygame.display.set_icon(icon)

# Fonts
title_font = pygame.font.SysFont('arial', 64, bold=True)
menu_font = pygame.font.SysFont('arial', 48)
info_font = pygame.font.SysFont('arial', 24)
score_font = pygame.font.SysFont('arial', 32)

# Try to load sounds
try:
    eat_sound = mixer.Sound(os.path.join('sounds', 'eat.wav'))
    crash_sound = mixer.Sound(os.path.join('sounds', 'crash.wav'))
    menu_sound = mixer.Sound(os.path.join('sounds', 'select.wav'))
except:
    # Create a dummy sound class if sounds can't be loaded
    class DummySound:
        def play(self):
            pass
    eat_sound = DummySound()
    crash_sound = DummySound()
    menu_sound = DummySound()

# Game settings and state
game_settings = {
    'snake_color': GREEN,
    'food_color': RED,
    'background_color': BLACK,
    'speed_multiplier': 1.0,
    'grid_visible': False,
    'sound_enabled': True,
}

# High scores dict
high_scores = {}

# Load high scores from file
def load_high_scores():
    global high_scores
    try:
        if os.path.exists('snake_scores.json'):
            with open('snake_scores.json', 'r') as f:
                high_scores = json.load(f)
    except:
        high_scores = {'easy': 0, 'normal': 0, 'hard': 0}

# Save high scores to file
def save_high_scores():
    try:
        with open('snake_scores.json', 'w') as f:
            json.dump(high_scores, f)
    except:
        print("Could not save high scores")

# Load high scores at startup
load_high_scores()

# Draw the background grid
def draw_grid():
    if game_settings['grid_visible']:
        for x in range(0, WIDTH, BLOCK_SIZE):
            pygame.draw.line(screen, LIGHT_GRAY, (x, 0), (x, HEIGHT))
        for y in range(0, HEIGHT, BLOCK_SIZE):
            pygame.draw.line(screen, LIGHT_GRAY, (0, y), (WIDTH, y))

# Draw the snake with gradient effect
def draw_snake(snake_list):
    for i, block in enumerate(snake_list):
        # Create a gradient effect from head to tail
        color_intensity = max(50, 255 - (len(snake_list) - i) * 5)
        if i == len(snake_list) - 1:  # Head
            snake_color = game_settings['snake_color']
        else:  # Body
            r, g, b = game_settings['snake_color']
            snake_color = (min(r, color_intensity), min(g, color_intensity), min(b, color_intensity))
            
        pygame.draw.rect(screen, snake_color, [block[0], block[1], BLOCK_SIZE, BLOCK_SIZE])
        pygame.draw.rect(screen, BLACK, [block[0], block[1], BLOCK_SIZE, BLOCK_SIZE], 1)
        
        # Draw eyes on the snake's head
        if i == len(snake_list) - 1:
            eye_size = BLOCK_SIZE // 5
            # Determine eye positions based on direction
            if snake_list[-1][0] > snake_list[-2][0]:  # Moving right
                left_eye = (block[0] + BLOCK_SIZE - eye_size - 2, block[1] + eye_size)
                right_eye = (block[0] + BLOCK_SIZE - eye_size - 2, block[1] + BLOCK_SIZE - eye_size * 2)
            elif snake_list[-1][0] < snake_list[-2][0]:  # Moving left
                left_eye = (block[0] + 2, block[1] + eye_size)
                right_eye = (block[0] + 2, block[1] + BLOCK_SIZE - eye_size * 2)
            elif snake_list[-1][1] < snake_list[-2][1]:  # Moving up
                left_eye = (block[0] + eye_size, block[1] + 2)
                right_eye = (block[0] + BLOCK_SIZE - eye_size * 2, block[1] + 2)
            else:  # Moving down
                left_eye = (block[0] + eye_size, block[1] + BLOCK_SIZE - eye_size - 2)
                right_eye = (block[0] + BLOCK_SIZE - eye_size * 2, block[1] + BLOCK_SIZE - eye_size - 2)
                
            pygame.draw.circle(screen, WHITE, left_eye, eye_size)
            pygame.draw.circle(screen, WHITE, right_eye, eye_size)
            pygame.draw.circle(screen, BLACK, left_eye, eye_size // 2)
            pygame.draw.circle(screen, BLACK, right_eye, eye_size // 2)

# Draw food with pulsating effect
def draw_food(food_x, food_y, pulse_value):
    pulse_size = int(BLOCK_SIZE * (1.0 + 0.2 * pulse_value))
    offset = (pulse_size - BLOCK_SIZE) // 2
    
    pygame.draw.rect(screen, game_settings['food_color'], 
                    [food_x - offset, food_y - offset, pulse_size, pulse_size])
    pygame.draw.rect(screen, (255, 255, 255), 
                    [food_x - offset, food_y - offset, pulse_size, pulse_size], 1)

# Draw game menu
def draw_menu(selected):
    screen.fill(game_settings['background_color'])
    
    # Title with shadow effect
    title_shadow = title_font.render("SNAKE GAME", True, (0, 100, 0))
    title = title_font.render("SNAKE GAME", True, GREEN)
    title_rect = title.get_rect(center=(WIDTH/2, HEIGHT/4))
    screen.blit(title_shadow, (title_rect.x + 3, title_rect.y + 3))
    screen.blit(title, title_rect)
    
    # Difficulty options
    options = ['Easy', 'Normal', 'Hard', 'Settings', 'Exit']
    y_pos = HEIGHT/2
    
    for i, option in enumerate(options):
        if i != selected:
            color = WHITE
            text = menu_font.render(option, True, color)
        else:
            # Highlighted option with pulsating effect
            pulse = (pygame.time.get_ticks() % 1000) / 1000
            color_value = int(155 + 100 * pulse)
            color = (color_value, 0, 0)
            text = menu_font.render(option, True, color)
            
        rect = text.get_rect(center=(WIDTH/2, y_pos))
        screen.blit(text, rect)
        
        # Display high scores for difficulty options
        if i < 3:  # Only for Easy, Normal, Hard
            difficulty_name = option.lower()
            high_score_text = info_font.render(f"High Score: {high_scores.get(difficulty_name, 0)}", 
                                              True, YELLOW)
            high_score_rect = high_score_text.get_rect(center=(WIDTH/2, y_pos + 30))
            screen.blit(high_score_text, high_score_rect)
            
        y_pos += 80
        
    # Instructions
    info_text = info_font.render("Use ARROW KEYS to navigate, ENTER to select", True, WHITE)
    info_rect = info_text.get_rect(center=(WIDTH/2, HEIGHT-50))
    screen.blit(info_text, info_rect)
    
    pygame.display.update()

# Draw settings menu
def draw_settings_menu(selected, options, values):
    screen.fill(game_settings['background_color'])
    
    # Title
    title = title_font.render("SETTINGS", True, BLUE)
    title_rect = title.get_rect(center=(WIDTH/2, HEIGHT/6))
    screen.blit(title, title_rect)
    
    # Options
    y_pos = HEIGHT/3
    
    for i, (option, value) in enumerate(zip(options, values)):
        option_text = menu_font.render(option, True, WHITE if i != selected else YELLOW)
        option_rect = option_text.get_rect(midright=(WIDTH/2 - 20, y_pos))
        screen.blit(option_text, option_rect)
        
        value_text = menu_font.render(str(value), True, WHITE if i != selected else YELLOW)
        value_rect = value_text.get_rect(midleft=(WIDTH/2 + 20, y_pos))
        screen.blit(value_text, value_rect)
        
        y_pos += 60
    
    # Back option
    back_text = menu_font.render("Back to Menu", True, WHITE if selected != len(options) else YELLOW)
    back_rect = back_text.get_rect(center=(WIDTH/2, y_pos + 40))
    screen.blit(back_text, back_rect)
    
    # Instructions
    info_text = info_font.render("Use ARROW KEYS to navigate, LEFT/RIGHT to change values", True, WHITE)
    info_rect = info_text.get_rect(center=(WIDTH/2, HEIGHT-50))
    screen.blit(info_text, info_rect)
    
    pygame.display.update()

# Settings menu
def settings_menu():
    selected = 0
    running = True
    
    options = ["Snake Color", "Food Color", "Speed", "Grid", "Sound"]
    
    # Map settings to display values
    color_options = ["Green", "Blue", "Purple", "Yellow"]
    color_values = [GREEN, BLUE, PURPLE, YELLOW]
    
    # Get current values
    snake_color_idx = color_values.index(game_settings['snake_color']) if game_settings['snake_color'] in color_values else 0
    food_color_idx = color_values.index(game_settings['food_color']) if game_settings['food_color'] in color_values else 0
    speed_multiplier = round(game_settings['speed_multiplier'] * 10) / 10
    grid_visible = "On" if game_settings['grid_visible'] else "Off"
    sound_enabled = "On" if game_settings['sound_enabled'] else "Off"
    
    values = [color_options[snake_color_idx], 
              color_options[food_color_idx], 
              speed_multiplier, 
              grid_visible, 
              sound_enabled]
    
    clock = pygame.time.Clock()
    
    while running:
        draw_settings_menu(selected, options, values)
        clock.tick(10)  # Control menu fps
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
                
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_DOWN:
                    selected = (selected + 1) % (len(options) + 1)  # +1 for back option
                    menu_sound.play()
                elif event.key == pygame.K_UP:
                    selected = (selected - 1) % (len(options) + 1)
                    menu_sound.play()
                elif event.key == pygame.K_RETURN:
                    if selected == len(options):  # Back option
                        # Save settings
                        game_settings['snake_color'] = color_values[color_options.index(values[0])]
                        game_settings['food_color'] = color_values[color_options.index(values[1])]
                        game_settings['speed_multiplier'] = float(values[2])
                        game_settings['grid_visible'] = values[3] == "On"
                        game_settings['sound_enabled'] = values[4] == "On"
                        running = False
                        menu_sound.play()
                elif event.key == pygame.K_ESCAPE:
                    running = False
                    menu_sound.play()
                
                # Change settings values
                if selected < len(options):
                    if event.key == pygame.K_RIGHT:
                        menu_sound.play()
                        if selected == 0:  # Snake color
                            snake_color_idx = (snake_color_idx + 1) % len(color_options)
                            values[0] = color_options[snake_color_idx]
                        elif selected == 1:  # Food color
                            food_color_idx = (food_color_idx + 1) % len(color_options)
                            values[1] = color_options[food_color_idx]
                        elif selected == 2:  # Speed
                            speed_multiplier = min(2.0, speed_multiplier + 0.1)
                            values[2] = round(speed_multiplier * 10) / 10
                        elif selected == 3:  # Grid
                            values[3] = "On" if values[3] == "Off" else "Off"
                        elif selected == 4:  # Sound
                            values[4] = "On" if values[4] == "Off" else "Off"
                    
                    elif event.key == pygame.K_LEFT:
                        menu_sound.play()
                        if selected == 0:  # Snake color
                            snake_color_idx = (snake_color_idx - 1) % len(color_options)
                            values[0] = color_options[snake_color_idx]
                        elif selected == 1:  # Food color
                            food_color_idx = (food_color_idx - 1) % len(color_options)
                            values[1] = color_options[food_color_idx]
                        elif selected == 2:  # Speed
                            speed_multiplier = max(0.5, speed_multiplier - 0.1)
                            values[2] = round(speed_multiplier * 10) / 10
                        elif selected == 3:  # Grid
                            values[3] = "On" if values[3] == "Off" else "Off"
                        elif selected == 4:  # Sound
                            values[4] = "On" if values[4] == "Off" else "Off"

# Create a new food item at a random position, not colliding with the snake
def create_food(snake_list):
    while True:
        food_x = random.randrange(0, GRID_WIDTH) * BLOCK_SIZE
        food_y = random.randrange(0, GRID_HEIGHT) * BLOCK_SIZE
        
        # Check if food overlaps with snake
        if [food_x, food_y] not in snake_list:
            return food_x, food_y

# Main menu
def main_menu():
    selected = 0
    running = True
    clock = pygame.time.Clock()
    
    while running:
        draw_menu(selected)
        clock.tick(10)  # Control menu fps
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
                
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_DOWN:
                    selected = (selected + 1) % 5  # 5 options
                    menu_sound.play()
                elif event.key == pygame.K_UP:
                    selected = (selected - 1) % 5
                    menu_sound.play()
                elif event.key == pygame.K_RETURN:
                    menu_sound.play()
                    
                    if selected < 3:  # Difficulty options
                        difficulty_names = ['easy', 'normal', 'hard']
                        speeds = [8, 15, 20]  # FPS values for difficulties
                        game_loop(speeds[selected], difficulty_names[selected])
                    elif selected == 3:  # Settings
                        settings_menu()
                    else:  # Exit
                        pygame.quit()
                        quit()
                elif event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    quit()

# Display pause screen
def show_pause_screen():
    overlay = pygame.Surface((WIDTH, HEIGHT))
    overlay.set_alpha(150)
    overlay.fill(BLACK)
    screen.blit(overlay, (0, 0))
    
    pause_text = title_font.render("PAUSED", True, WHITE)
    pause_rect = pause_text.get_rect(center=(WIDTH/2, HEIGHT/2))
    screen.blit(pause_text, pause_rect)
    
    resume_text = info_font.render("Press P to Resume", True, WHITE)
    resume_rect = resume_text.get_rect(center=(WIDTH/2, HEIGHT/2 + 60))
    screen.blit(resume_text, resume_rect)
    
    pygame.display.update()

# Show game over screen
def show_game_over_screen(score, elapsed_time, difficulty):
    overlay = pygame.Surface((WIDTH, HEIGHT))
    overlay.set_alpha(200)
    overlay.fill(BLACK)
    screen.blit(overlay, (0, 0))
    
    # Game over text
    game_over_text = title_font.render("GAME OVER", True, RED)
    game_over_rect = game_over_text.get_rect(center=(WIDTH/2, HEIGHT/3))
    screen.blit(game_over_text, game_over_rect)
    
    # Score and time
    score_text = score_font.render(f"Score: {score}", True, WHITE)
    score_rect = score_text.get_rect(center=(WIDTH/2, HEIGHT/2 - 40))
    screen.blit(score_text, score_rect)
    
    minutes = int(elapsed_time // 60)
    seconds = int(elapsed_time % 60)
    time_text = score_font.render(f"Time: {minutes}:{seconds:02d}", True, WHITE)
    time_rect = time_text.get_rect(center=(WIDTH/2, HEIGHT/2))
    screen.blit(time_text, time_rect)
    
    # High score notification
    if score > high_scores.get(difficulty, 0):
        high_scores[difficulty] = score
        save_high_scores()
        new_high_text = score_font.render("NEW HIGH SCORE!", True, YELLOW)
        new_high_rect = new_high_text.get_rect(center=(WIDTH/2, HEIGHT/2 + 40))
        screen.blit(new_high_text, new_high_rect)
    
    # Options
    options_text = info_font.render("C - Play Again | Q - Quit | M - Menu", True, WHITE)
    options_rect = options_text.get_rect(center=(WIDTH/2, HEIGHT*3/4))
    screen.blit(options_text, options_rect)
    
    pygame.display.update()

# Main game loop
def game_loop(speed, difficulty):
    game_over = False
    game_paused = False
    start_time = time.time()
    pause_start_time = 0
    total_pause_time = 0
    
    # Initial snake position (middle of screen)
    x = (GRID_WIDTH // 2) * BLOCK_SIZE
    y = (GRID_HEIGHT // 2) * BLOCK_SIZE
    dx = BLOCK_SIZE
    dy = 0
    
    snake_list = [[x - BLOCK_SIZE*2, y], [x - BLOCK_SIZE, y], [x, y]]
    snake_length = 3
    
    # Create initial food
    food_x, food_y = create_food(snake_list)
    
    # Food animation variables
    food_pulse = 0
    food_pulse_dir = 1
    
    # Special food (bonus) variables
    special_food_active = False
    special_food_x = 0
    special_food_y = 0
    special_food_timer = 0
    
    # Game score and timing
    score = 0
    combo_counter = 0
    last_direction_change = time.time()
    direction_queue = []  # Queue for direction changes
    
    clock = pygame.time.Clock()
    adjusted_speed = int(speed * game_settings['speed_multiplier'])
    
    while not game_over:
        current_time = time.time()
        elapsed_time = current_time - start_time - total_pause_time
        
        # Handle game pausing
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_p:
                    if game_paused:
                        total_pause_time += time.time() - pause_start_time
                        game_paused = False
                    else:
                        pause_start_time = time.time()
                        game_paused = True
                        show_pause_screen()
                
                if not game_paused:
                    # Store direction changes in a queue
                    if event.key == pygame.K_LEFT and dx != BLOCK_SIZE:
                        direction_queue.append((-BLOCK_SIZE, 0))
                    elif event.key == pygame.K_RIGHT and dx != -BLOCK_SIZE:
                        direction_queue.append((BLOCK_SIZE, 0))
                    elif event.key == pygame.K_UP and dy != BLOCK_SIZE:
                        direction_queue.append((0, -BLOCK_SIZE))
                    elif event.key == pygame.K_DOWN and dy != -BLOCK_SIZE:
                        direction_queue.append((0, BLOCK_SIZE))
                    elif event.key == pygame.K_ESCAPE:
                        game_over = True
        
        if game_paused:
            continue
        
        # Process direction queue
        if direction_queue and (current_time - last_direction_change) > (1 / adjusted_speed * 0.8):
            dx, dy = direction_queue.pop(0)
            last_direction_change = current_time
        
        # Move snake
        x += dx
        y += dy
        
        # Check for wall collision
        if x >= WIDTH or x < 0 or y >= HEIGHT or y < 0:
            if game_settings['sound_enabled']:
                crash_sound.play()
            show_game_over_screen(score, elapsed_time, difficulty)
            wait_for_key_press()
            return
        
        # Update screen
        screen.fill(game_settings['background_color'])
        draw_grid()
        
        # Draw food with pulsating effect
        food_pulse += 0.1 * food_pulse_dir
        if food_pulse >= 1.0:
            food_pulse = 1.0
            food_pulse_dir = -1
        elif food_pulse <= 0.0:
            food_pulse = 0.0
            food_pulse_dir = 1
        
        draw_food(food_x, food_y, food_pulse)
        
        # Draw special food if active
        if special_food_active:
            special_food_timer -= 1
            # Special food blinks faster as timer decreases
            if special_food_timer % max(1, int(30 * (special_food_timer / 300))) < 15:
                special_size = BLOCK_SIZE + 4
                pygame.draw.rect(screen, YELLOW, 
                            [special_food_x-2, special_food_y-2, special_size, special_size])
                pygame.draw.rect(screen, WHITE, 
                            [special_food_x-2, special_food_y-2, special_size, special_size], 1)
            
            if special_food_timer <= 0:
                special_food_active = False
        
        # Update snake
        snake_head = [x, y]
        snake_list.append(snake_head)
        
        if len(snake_list) > snake_length:
            del snake_list[0]
        
        # Check for collision with self
        for segment in snake_list[:-1]:
            if segment == snake_head:
                if game_settings['sound_enabled']:
                    crash_sound.play()
                show_game_over_screen(score, elapsed_time, difficulty)
                wait_for_key_press()
                return
        
        draw_snake(snake_list)
        
        # Check for food collision
        if x == food_x and y == food_y:
            if game_settings['sound_enabled']:
                eat_sound.play()
            
            food_x, food_y = create_food(snake_list)
            snake_length += 1
            
            # Scoring with combo system
            combo_counter += 1
            combo_multiplier = min(5, combo_counter)
            score += 10 * combo_multiplier
            
            # Randomly spawn special food
            if not special_food_active and random.random() < 0.3:  # 30% chance
                special_food_x, special_food_y = create_food(snake_list + [[food_x, food_y]])
                special_food_active = True
                special_food_timer = 300  # Frames until special food disappears
        
        # Check for special food collision
        if special_food_active and x == special_food_x and y == special_food_y:
            if game_settings['sound_enabled']:
                eat_sound.play()
            
            special_food_active = False
            snake_length += 2  # Bigger growth
            score += 50  # Bigger score
        
        # Display score and time
        score_text = info_font.render(f"Score: {score}", True, WHITE)
        high_score_text = info_font.render(f"High Score: {high_scores.get(difficulty, 0)}", True, WHITE)
        time_text = info_font.render(f"Time: {int(elapsed_time//60)}:{int(elapsed_time%60):02d}", True, WHITE)
        
        screen.blit(score_text, [10, 10])
        screen.blit(high_score_text, [10, 40])
        screen.blit(time_text, [WIDTH-150, 10])
        
        if combo_counter > 1:
            combo_text = info_font.render(f"Combo: x{min(5, combo_counter)}", True, YELLOW)
            screen.blit(combo_text, [WIDTH-150, 40])
        
        # Decrease combo over time
        if current_time - last_direction_change > 2.0:  # Reset combo after 2 seconds of no eating
            combo_counter = max(0, combo_counter - 1)
        
        pygame.display.update()
        clock.tick(adjusted_speed)

# Wait for specific key press
def wait_for_key_press():
    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q:
                    pygame.quit()
                    quit()
                elif event.key == pygame.K_c:
                    return
                elif event.key == pygame.K_m:
                    main_menu()
                    return

# Start the game
if __name__ == "__main__":
    main_menu()