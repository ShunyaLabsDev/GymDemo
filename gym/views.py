from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.core.mail import send_mail
from django.views.decorators.http import require_POST
import json, sys, os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import site_config

from .models import Trainer, Transformation, GalleryImage, Testimonial
from .forms import ContactForm, SimulatorLeadForm


def home(request):
    trainers = Trainer.objects.filter(is_featured=True)[:4]
    transformations = Transformation.objects.filter(is_featured=True)[:3]
    testimonials = Testimonial.objects.filter(is_featured=True)[:6]
    contact_form = ContactForm()
    simulator_form = SimulatorLeadForm()
    return render(request, 'gym/home.html', {
        'trainers': trainers,
        'transformations': transformations,
        'testimonials': testimonials,
        'contact_form': contact_form,
        'simulator_form': simulator_form,
        'page': 'home',
    })


def about(request):
    trainers = Trainer.objects.filter(is_featured=True)
    return render(request, 'gym/about.html', {'trainers': trainers, 'page': 'about'})


def membership(request):
    return render(request, 'gym/membership.html', {'page': 'membership'})


def trainers(request):
    all_trainers = Trainer.objects.all()
    return render(request, 'gym/trainers.html', {'trainers': all_trainers, 'page': 'trainers'})


def gallery(request):
    category = request.GET.get('category', 'all')
    images = GalleryImage.objects.all()
    if category != 'all':
        images = images.filter(category=category)
    categories = GalleryImage.CATEGORIES
    return render(request, 'gym/gallery.html', {
        'images': images,
        'categories': categories,
        'active_category': category,
        'page': 'gallery',
    })


def contact(request):
    form = ContactForm()
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            lead = form.save(commit=False)
            lead.source = 'contact'
            lead.save()
            # Send email notification
            try:
                send_mail(
                    subject=f'New Inquiry from {lead.name} — {site_config.GYM_NAME}',
                    message=f'Name: {lead.name}\nEmail: {lead.email}\nPhone: {lead.phone}\n\nMessage:\n{lead.message}',
                    from_email=site_config.EMAIL_MAIN,
                    recipient_list=[site_config.ADMIN_NOTIFY_EMAIL],
                    fail_silently=True,
                )
            except Exception:
                pass
            messages.success(request, f"Thanks {lead.name}! We'll contact you within 24 hours.")
            return redirect('contact')
    return render(request, 'gym/contact.html', {'form': form, 'page': 'contact'})


@require_POST
def submit_simulator(request):
    """AJAX endpoint — saves simulator leads."""
    try:
        data = json.loads(request.body)
        form = SimulatorLeadForm(data)
        if form.is_valid():
            lead = form.save(commit=False)
            lead.source = 'simulator'
            lead.save()
            try:
                send_mail(
                    subject=f'Simulator Lead: {lead.name} — {lead.fitness_goal}',
                    message=f'Name: {lead.name}\nEmail: {lead.email}\nPhone: {lead.phone}\nGoal: {lead.fitness_goal}\nLevel: {lead.fitness_level}\nTimeline: {lead.timeline}\nRecommended: {lead.recommended_plan}',
                    from_email=site_config.EMAIL_MAIN,
                    recipient_list=[site_config.ADMIN_NOTIFY_EMAIL],
                    fail_silently=True,
                )
            except Exception:
                pass
            return JsonResponse({'success': True, 'message': f"Your journey plan is set, {lead.name}! Our team will reach out soon."})
        return JsonResponse({'success': False, 'errors': form.errors})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})
