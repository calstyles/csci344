from flask import Response, request
from flask_restful import Resource
import json
from models import db, Comment, Post

class CommentListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def post(self):
        body = request.get_json()
        if body is None:
            return Response(json.dumps({'error': 'Request body is empty or content-type header is not set to "application/json".'}), status=400)
        # create a new "Comment" based on the data posted in the body 
        post = Post.query.get(body['post_id'])
        if post is None:
            return Response(json.dumps({'error': f'Post with id {body["post_id"]} not found.'}), status=404)

        if post.user_id != self.current_user.id:
            return Response(json.dumps({'error': f'You are not authorized to create a comment on this post.'}), status=404)

        comment = Comment(text=body['text'], user_id=self.current_user.id, post_id=post.id)

        db.session.add(comment)
        db.session.commit()

        return Response(json.dumps(comment.to_dict()), mimetype="application/json", status=201)

class CommentDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
  
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()

        if comment is None:
            return Response(json.dumps({"error": "Comment not found"}), mimetype="application/json", status=404)

        if comment.user_id != self.current_user.id:
            return Response(json.dumps({"error": "You are not authorized to delete this comment"}), mimetype="application/json", status=404)

        db.session.delete(comment)
        db.session.commit()

        return Response(json.dumps({}), mimetype="application/json", status=200)

def initialize_routes(api):
    api.add_resource(
        CommentListEndpoint, 
        '/api/comments', 
        '/api/comments/',
        resource_class_kwargs={'current_user': api.app.current_user}

    )
    api.add_resource(
        CommentDetailEndpoint, 
        '/api/comments/<int:id>', 
        '/api/comments/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )
