"""
Context processor — injects site_config into every template automatically.
This is how changing site_config.py updates the entire website.
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import site_config

def site_config_context(request):
    """Makes all site_config values available in every template as {{ config.* }}"""
    return {
        'config': {
            'gym_name': site_config.GYM_NAME,
            'tagline': site_config.GYM_TAGLINE,
            'description': site_config.GYM_DESCRIPTION,
            'phone': site_config.PHONE_PRIMARY,
            'phone2': site_config.PHONE_SECONDARY,
            'whatsapp': site_config.WHATSAPP_NUMBER,
            'email': site_config.EMAIL_MAIN,
            'address_line1': site_config.ADDRESS_LINE1,
            'address_line2': site_config.ADDRESS_LINE2,
            'address_city': site_config.ADDRESS_CITY,
            'address_full': site_config.ADDRESS_FULL,
            'maps_embed': site_config.GOOGLE_MAPS_EMBED,
            'working_hours': site_config.WORKING_HOURS,
            'instagram': site_config.SOCIAL_INSTAGRAM,
            'facebook': site_config.SOCIAL_FACEBOOK,
            'youtube': site_config.SOCIAL_YOUTUBE,
            'twitter': site_config.SOCIAL_TWITTER,
            'tiktok': site_config.SOCIAL_TIKTOK,
            'plans': site_config.MEMBERSHIP_PLANS,
            'stats': site_config.STATS,
            'established': site_config.GYM_ESTABLISHED,
            'admin_email': site_config.ADMIN_NOTIFY_EMAIL,
        }
    }
