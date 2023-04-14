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

        if body is None:
            return Response(json.dumps({'error': 'Request body is empty or content-type header is not set to "application/json".'}), status=400)
        
        if isinstance(body['post_id'], str):
            return Response(json.dumps({'error': 'Invalid post_id format. Must be an integer.'}), status=400)
        
        if not post_id:
            return Response(json.dumps({'error': 'post_id is required'}), mimetype="application/json", status=404)

        like = LikePost.query.get(body['post_id'])

        if like is None:
            return Response(json.dumps({'error': f'Post with id {body["post_id"]} not found.'}), status=404)
        
        if like.user_id != self.current_user.id:
            return Response(json.dumps({'error': f'You are not authorized to add a like on this post.'}), status=404)

        like_post = LikePost(user_id=self.current_user.id, post_id=post_id)
        db.session.add(like_post)
        db.session.commit()

        return Response(json.dumps(like_post.to_dict()), mimetype="application/json", status=201)
    
class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def delete(self, id):
        like_post = LikePost.query.filter_by(id=id, user_id=self.current_user.id).first().delete()
        if not like_post:
            return Response(json.dumps({'error': 'Like not found'}), mimetype="application/json", status=404)
        
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
