from django.shortcuts import render

# Create your views here.

def index(request):
    """View to render the index/home page"""
    return render(request, 'index.html')

"""
def about_us(request):
    return render(request, "components/about_us.html")
"""
