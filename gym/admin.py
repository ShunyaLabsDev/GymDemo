from django.contrib import admin
from django.utils.html import format_html
from .models import Lead, Trainer, Transformation, GalleryImage, Testimonial

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'source', 'status_badge', 'created_at']
    list_filter = ['status', 'source', 'created_at']
    search_fields = ['name', 'email', 'phone']
    list_editable = []
    readonly_fields = ['created_at']
    fieldsets = (
        ('Contact Info', {'fields': ('name', 'email', 'phone', 'message')}),
        ('Lead Meta', {'fields': ('source', 'status', 'created_at')}),
        ('Simulator Data', {'fields': ('fitness_level', 'fitness_goal', 'timeline', 'recommended_plan'), 'classes': ('collapse',)}),
    )
    def status_badge(self, obj):
        colors = {'new': '#FF6B35', 'contacted': '#3498db', 'converted': '#2ecc71', 'closed': '#95a5a6'}
        color = colors.get(obj.status, '#ccc')
        return format_html('<span style="background:{};color:#fff;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">{}</span>', color, obj.status.upper())
    status_badge.short_description = 'Status'

@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'experience', 'is_featured', 'order']
    list_editable = ['is_featured', 'order']

@admin.register(Transformation)
class TransformationAdmin(admin.ModelAdmin):
    list_display = ['member_name', 'duration', 'goal_type', 'is_featured']
    list_editable = ['is_featured']

@admin.register(GalleryImage)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['caption', 'category', 'order']
    list_editable = ['order']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['member_name', 'rating', 'is_featured']
    list_editable = ['is_featured']
