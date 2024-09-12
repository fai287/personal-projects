# A skeleton of a blog posting website 
from flask import Flask, render_template, request, redirect 
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime 


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///posts.db'
db = SQLAlchemy(app)


class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(30), nullable=False, default="unknown")
    date_posted = db.Column(db.Text, nullable=False, default=datetime.now().strftime("%d-%m-%Y %H:%M:%S"))

    def __repr__(self):
        return f"<BlogPost ID: {self.id} By: {self.author} On: {self.date_posted}>"


with app.app_context():
    db.create_all()


@app.route("/")
@app.route("/home")
def index():
    return render_template('index.html')


@app.route("/posts", methods=["GET"])
def visit_posts():
    with app.app_context():
        all_posts = BlogPost.query.order_by(BlogPost.id.desc()).all()
    return render_template('posts.html', posts=all_posts)


@app.route("/addpost", methods=["GET", "POST"])
def add_post():
    if request.method == "GET":
        return render_template('addpost.html')
    else: 
        title = request.form["title"]
        content = request.form["content"]
        author = request.form["author"]
        new_post = BlogPost(title=title, content=content, author=author)
        with app.app_context():
            db.session.add(new_post)
            db.session.commit()
        return redirect('/posts')


@app.route("/posts/edit/<post_id>", methods=["GET", "POST"])
def edit_post(post_id):
    if request.method == "GET":
        with app.app_context():
            selected_post = BlogPost.query.filter_by(id=int(post_id)).first()
        return render_template('edit.html',post=selected_post)
    else: 
        with app.app_context():
            selected_post = BlogPost.query.filter_by(id=int(post_id)).first()
            selected_post.title = request.form["title"]
            selected_post.content = request.form["content"]
            selected_post.author = request.form["author"]
            db.session.commit()
        return redirect('/posts')



@app.route("/posts/delete/<post_id>")
def delete_post(post_id):
    with app.app_context():
        blog_to_delete = BlogPost.query.filter_by(id=int(post_id)).first()
        db.session.delete(blog_to_delete)
        db.session.commit()
    return redirect('/posts')


if __name__ == '__main__':
    app.run(debug=True)