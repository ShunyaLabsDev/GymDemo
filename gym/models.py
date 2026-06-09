from django.db import models
from django.utils import timezone


class Lead(models.Model):
    LEAD_SOURCES = [('contact', 'Contact Form'), ('simulator', 'Fitness Simulator'), ('membership', 'Membership Inquiry')]
    STATUS_CHOICES = [('new', 'New'), ('contacted', 'Contacted'), ('converted', 'Converted'), ('closed', 'Closed')]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField(blank=True)
    source = models.CharField(max_length=20, choices=LEAD_SOURCES, default='contact')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(default=timezone.now)
    fitness_level = models.CharField(max_length=50, blank=True)
    fitness_goal = models.CharField(max_length=50, blank=True)
    timeline = models.CharField(max_length=50, blank=True)
    recommended_plan = models.CharField(max_length=50, blank=True)
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Lead'
        verbose_name_plural = 'Leads'
    def __str__(self):
        return f"{self.name} — {self.source} ({self.status})"


class Trainer(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    bio = models.TextField()
    photo = models.ImageField(upload_to='trainers/', blank=True)
    experience = models.IntegerField(help_text='Years of experience')
    specialties = models.CharField(max_length=255)
    certifications = models.TextField()
    instagram = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=True)
    class Meta:
        ordering = ['order', 'name']
    def __str__(self):
        return f"{self.name} — {self.title}"
    def get_specialties_list(self):
        return [s.strip() for s in self.specialties.split(',')]
    def get_certifications_list(self):
        return [c.strip() for c in self.certifications.split(',')]


class Transformation(models.Model):
    member_name = models.CharField(max_length=100)
    before_photo = models.ImageField(upload_to='transformations/', blank=True)
    after_photo = models.ImageField(upload_to='transformations/', blank=True)
    duration = models.CharField(max_length=50)
    weight_lost = models.CharField(max_length=30, blank=True)
    muscle_gained = models.CharField(max_length=30, blank=True)
    testimonial = models.TextField()
    goal_type = models.CharField(max_length=50, default='Weight Loss')
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return f"{self.member_name} — {self.duration}"


class GalleryImage(models.Model):
    CATEGORIES = [('facility', 'Facility'), ('equipment', 'Equipment'), ('classes', 'Classes'), ('transformation', 'Transformations'), ('events', 'Events')]
    image = models.ImageField(upload_to='gallery/')
    caption = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=30, choices=CATEGORIES, default='facility')
    order = models.IntegerField(default=0)
    class Meta:
        ordering = ['order']
    def __str__(self):
        return f"{self.category} — {self.caption}"


class Testimonial(models.Model):
    member_name = models.CharField(max_length=100)
    member_title = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='testimonials/', blank=True)
    text = models.TextField()
    rating = models.IntegerField(default=5)
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return f"{self.member_name} ({self.rating}★)"
