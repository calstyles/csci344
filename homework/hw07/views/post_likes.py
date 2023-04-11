from flask import Response, request
from flask_restful import Resource
from models import LikePost, db
import json

class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def post(self):
        # create a new "like_post" based on the data posted in the body 
        body = request.get_json()
        post_id = body.get('post_id')
        if not post_id:
            return Response(json.dumps({'error': 'post_id is required'}), mimetype="application/json", status=400)
        
        like_post = LikePost(user_id=self.current_user.id, post_id=post_id)
        db.session.add(like_post)
        db.session.commit()
        
        return Response(json.dumps(like_post.to_dict()), mimetype="application/json", status=201)
    
class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def delete(self, id):
        like_post = LikePost.query.filter_by(id=id, user_id=self.current_user.id).first()
        if not like_post:
            return Response(json.dumps({'error': 'Like not found'}), mimetype="application/json", status=404)
        
        db.session.delete(like_post)
        db.session.commit()
        
        return Response(json.dumps({}), mimetype="application/json", status=200)


def initialize_routes(api):
    api.add_resource(
        PostLikesListEndpoint, 
        '/api/posts/likes', 
        '/api/posts/likes/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )

    api.add_resource(
        PostLikesDetailEndpoint, 
        '/api/posts/likes/<int:id>', 
        '/api/posts/likes/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )
