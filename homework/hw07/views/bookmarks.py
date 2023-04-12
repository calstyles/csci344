from flask import Response, request
from flask_restful import Resource
from models import Bookmark, db
import json

class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def get(self):
        # get all bookmarks owned by the current user
        bookmark_records = Bookmark.query.filter_by(user_id = self.current_user.id)
        return Response(json.dumps([bookmark.to_dict() for bookmark in bookmark_records]), mimetype="application/json", status=200)

    def post(self):
        # create a new "bookmark" based on the data posted in the body 
        body = request.get_json()
        post_id = body.get('post_id')
        if post_id is None:
            return Response(json.dumps({'error': 'post_id is required'}), mimetype="application/json", status=400)

        # check if the user is authorized to access the specified post
        post = Bookmark.query.get(post_id)
        if post is None or not post.can_be_viewed_by(self.current_user):
            return Response(json.dumps({'error': 'post not found or unauthorized to access'}), mimetype="application/json", status=404)

        bookmark = Bookmark(user_id=self.current_user.id, post_id=post_id)
        db.session.add(bookmark)
        db.session.commit()

        return Response(json.dumps(bookmark.to_dict()), mimetype="application/json", status=201)

class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def delete(self, id):
        # delete "bookmark" record where "id"=id
        bookmark = Bookmark.query.get(id)

        print(id)
        
        db.session.delete(bookmark)
        db.session.commit()
        return Response(json.dumps({}), mimetype="application/json", status=200)



def initialize_routes(api):
    api.add_resource(
        BookmarksListEndpoint, 
        '/api/bookmarks', 
        '/api/bookmarks/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )

    api.add_resource(
        BookmarkDetailEndpoint, 
        '/api/bookmarks/<int:id>', 
        '/api/bookmarks/<int:id>',
        resource_class_kwargs={'current_user': api.app.current_user}
    )
