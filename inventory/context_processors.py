from .dashboard_utils import get_alerts

def alerts_processor(request):
    """
    Context processor that adds alerts to all templates
    """
    return {'alerts': get_alerts()}