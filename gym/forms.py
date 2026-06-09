from django import forms
from .models import Lead

class ContactForm(forms.ModelForm):
    """Main contact form — validates and saves to Lead model."""
    class Meta:
        model = Lead
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name':    forms.TextInput(attrs={'placeholder': 'Your Full Name', 'class': 'apex-input'}),
            'email':   forms.EmailInput(attrs={'placeholder': 'your@email.com', 'class': 'apex-input'}),
            'phone':   forms.TextInput(attrs={'placeholder': '+91 XXXXX XXXXX', 'class': 'apex-input'}),
            'message': forms.Textarea(attrs={'placeholder': 'Tell us about your fitness goals…', 'rows': 4, 'class': 'apex-input'}),
        }

class SimulatorLeadForm(forms.ModelForm):
    """Captures lead data from the Fitness Journey Simulator."""
    class Meta:
        model = Lead
        fields = ['name', 'email', 'phone', 'fitness_level', 'fitness_goal', 'timeline', 'recommended_plan']
        widgets = {
            'name':  forms.TextInput(attrs={'placeholder': 'Your Name', 'class': 'apex-input'}),
            'email': forms.EmailInput(attrs={'placeholder': 'your@email.com', 'class': 'apex-input'}),
            'phone': forms.TextInput(attrs={'placeholder': '+91 XXXXX XXXXX', 'class': 'apex-input'}),
            'fitness_level':    forms.HiddenInput(),
            'fitness_goal':     forms.HiddenInput(),
            'timeline':         forms.HiddenInput(),
            'recommended_plan': forms.HiddenInput(),
        }
