from fabric.api import local
from jinja2 import Environment, FileSystemLoader


template_env = Environment(loader=FileSystemLoader('.'))


def build():
    template = template_env.get_template('jinja_index.html')
    rendered_template = template.render()
    with open('index.html', 'wb') as fh:
        fh.write(rendered_template.encode("utf-8"))

def publish():
    build()
    local('git add index.html')
    local('git commit -m "index changed"')
    local('git push')
