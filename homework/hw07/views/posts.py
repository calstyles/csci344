from flask import Response, request
from flask_restful import Resource
from models import Post, db
from views import get_authorized_user_ids

import json

def get_path():
    return request.host_url + 'api/posts/'

class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # get list of authorized user IDs:
        user_ids = get_authorized_user_ids(self.current_user)

        # get posts by authorized users:
        posts = Post.query.filter(Post.user_id.in_(user_ids))

        # apply limit parameter, if provided:
        try:
            limit = int(request.args.get('limit', 20))
        except ValueError:
            return Response(json.dumps({"message": "Invalid limit parameter"}), mimetype="application/json", status=400)
            
        if limit > 50:
            return Response(json.dumps({"message": "Invalid limit parameter"}), mimetype="application/json", status=400)
        posts = posts.limit(limit)

        # return response:
        return Response(json.dumps([post.to_dict() for post in posts]), mimetype="application/json", status=200)
    
    def post(self):
        # create a new post based on the data posted in the body 
        body = request.get_json()
        image_url = body.get('image_url')
        if not image_url:
            return Response(json.dumps({"message": "Missing required field 'image_url'"}), mimetype="application/json", status=400)

        caption = body.get('caption')
        alt_text = body.get('alt_text')

        # create and add the new post to the database:
        post = Post(image_url=image_url, user_id=self.current_user.id, caption=caption, alt_text=alt_text)
        db.session.add(post)
        db.session.commit()

        # return the new post as a response:
        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=201)
    
class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
        

    def patch(self, id):
        # update post based on the data posted in the body 
        body = request.get_json()
        print(body)       
        return Response(json.dumps({}), mimetype="application/json", status=200)


    def delete(self, id):
        # delete post where "id"=id
        return Response(json.dumps({}), mimetype="application/json", status=200)


    def get(self, id):
        print(id)
        post = Post.query.filter_by(id=id).first()
        if not post:
            return Response(json.dumps({"message": "Post not found"}), mimetype="application/json", status=404)
        elif post.user_id != self.current_user.id:
            return Response(json.dumps({"message": "Permission Denied"}), mimetype="application/json", status=404)
        else:
            return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)
        
def initialize_routes(api):
    api.add_resource(
        PostListEndpoint, 
        '/api/posts', '/api/posts/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
    api.add_resource(
        PostDetailEndpoint, 
        '/api/posts/<int:id>', '/api/posts/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )