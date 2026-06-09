"""
╔══════════════════════════════════════════════════════════════╗
║           APEX FITNESS — SITE CONFIGURATION FILE            ║
║   Change values here and they update across the ENTIRE site  ║
╚══════════════════════════════════════════════════════════════╝
"""

# ─── GYM IDENTITY ──────────────────────────────────────────────────────────────
GYM_NAME        = "APEX FITNESS"
GYM_TAGLINE     = "Where Legends Are Forged"
GYM_ESTABLISHED = "2015"
GYM_DESCRIPTION = (
    "APEX Fitness is not just a gym — it's a movement. "
    "Built for those who refuse to settle, our world-class facility "
    "combines cutting-edge equipment, elite coaching, and a culture "
    "that turns ambition into achievement."
)

# ─── CONTACT DETAILS ───────────────────────────────────────────────────────────
PHONE_PRIMARY   = "+91 98765 43210"
PHONE_SECONDARY = "+91 91234 56789"
WHATSAPP_NUMBER = "919876543210"          # Country code without '+'
EMAIL_MAIN      = "hello@apexfitness.in"
EMAIL_SUPPORT   = "support@apexfitness.in"

ADDRESS_LINE1   = "12, Elite Business Park"
ADDRESS_LINE2   = "Near Central Mall, SG Highway"
ADDRESS_CITY    = "Ahmedabad"
ADDRESS_STATE   = "Gujarat"
ADDRESS_PINCODE = "380054"
ADDRESS_FULL    = f"{ADDRESS_LINE1}, {ADDRESS_LINE2}, {ADDRESS_CITY}, {ADDRESS_STATE} — {ADDRESS_PINCODE}"

GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.902...your_embed_url"

# ─── WORKING HOURS ─────────────────────────────────────────────────────────────
WORKING_HOURS = {
    "Monday – Friday": "5:00 AM – 11:00 PM",
    "Saturday":        "6:00 AM – 10:00 PM",
    "Sunday":          "7:00 AM – 8:00 PM",
    "Public Holidays": "8:00 AM – 6:00 PM",
}

# ─── SOCIAL MEDIA ──────────────────────────────────────────────────────────────
SOCIAL_INSTAGRAM  = "https://instagram.com/apexfitness"
SOCIAL_FACEBOOK   = "https://facebook.com/apexfitness"
SOCIAL_YOUTUBE    = "https://youtube.com/apexfitness"
SOCIAL_TWITTER    = "https://twitter.com/apexfitness"
SOCIAL_TIKTOK     = "https://tiktok.com/@apexfitness"

# ─── MEMBERSHIP PRICES (in INR) ────────────────────────────────────────────────
MEMBERSHIP_PLANS = [
    {
        "name":      "SPARK",
        "duration":  "Monthly",
        "months":    1,
        "price":     2499,
        "original":  None,
        "badge":     None,
        "color":     "#FF6B35",
        "features": [
            "Full Gym Access",
            "2 Personal Training Sessions",
            "Locker Room Access",
            "Fitness Assessment",
            "App Access",
            "Group Classes (2/week)",
        ],
        "excluded": ["Nutrition Coaching", "Sauna & Steam", "Priority Booking"],
    },
    {
        "name":      "SURGE",
        "duration":  "Quarterly",
        "months":    3,
        "price":     5999,
        "original":  7497,
        "badge":     "POPULAR",
        "color":     "#FF4500",
        "features": [
            "Full Gym Access",
            "8 Personal Training Sessions",
            "Locker Room Access",
            "Quarterly Assessments",
            "Premium App Access",
            "Unlimited Group Classes",
            "Nutrition Coaching",
            "Sauna & Steam",
        ],
        "excluded": ["Priority Booking"],
    },
    {
        "name":      "APEX",
        "duration":  "Half-Yearly",
        "months":    6,
        "price":     9999,
        "original":  14994,
        "badge":     "BEST VALUE",
        "color":     "#FF2D00",
        "features": [
            "Full Gym Access 24/7",
            "20 Personal Training Sessions",
            "Premium Locker with Towel Service",
            "Monthly Assessments",
            "VIP App Access",
            "Unlimited Group Classes",
            "Advanced Nutrition Coaching",
            "Unlimited Sauna & Steam",
            "Priority Booking",
        ],
        "excluded": [],
    },
    {
        "name":      "LEGEND",
        "duration":  "Yearly",
        "months":    12,
        "price":     15999,
        "original":  29988,
        "badge":     "ULTIMATE",
        "color":     "#CC2200",
        "features": [
            "Full Gym Access 24/7",
            "Unlimited Personal Training",
            "VIP Locker with Concierge",
            "Weekly Assessments",
            "Elite App + Wearable Sync",
            "Unlimited Group Classes",
            "Custom Nutrition & Meal Plans",
            "Unlimited Sauna, Steam & Spa",
            "Priority + Guest Passes (4/year)",
            "Exclusive Member Events",
        ],
        "excluded": [],
    },
]

# ─── STATISTICS ────────────────────────────────────────────────────────────────
STATS = [
    {"value": "8500+",  "label": "Members Strong"},
    {"value": "97%",    "label": "Satisfaction Rate"},
    {"value": "45+",    "label": "Elite Trainers"},
    {"value": "12,000", "label": "Sq. Ft. Facility"},
]

# ─── EMAIL CONFIG (Update with real credentials) ───────────────────────────────
EMAIL_HOST          = "smtp.gmail.com"
EMAIL_PORT          = 587
EMAIL_HOST_USER     = "your@gmail.com"
EMAIL_HOST_PASSWORD = "your_app_password"
EMAIL_USE_TLS       = True
ADMIN_NOTIFY_EMAIL  = "admin@apexfitness.in"
