from flask import Response, request
from flask_restful import Resource
from models import Following, User, db
import json

def get_path():
    return request.host_url + 'api/posts/'

class FollowingListEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user
    
    def get(self):
        following_records = Following.query.filter_by(user_id=self.current_user.id)

        following_list = [following.to_dict_following() for following in following_records]

        return Response(json.dumps(following_list), mimetype="application/json", status=200)
    
    def post(self):
        # create a new "following" record based on the data posted in the body 
        body = request.get_json()
        user_id = body.get('user_id')
        if not user_id:
            return Response(json.dumps({'error': 'user_id is required'}), mimetype="application/json", status=400)
        following = Following(user_id=user_id, following_id=self.current_user.id)
        db.session.add(following)
        db.session.commit()
        return Response(json.dumps(following.to_dict_following()), mimetype="application/json", status=201)

class FollowingDetailEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user
    
    def delete(self, id):
        # delete "following" record where "id"=id
        following = Following.query.filter_by(id=id, user_id=self.current_user.id).first()
        if not following:
            return Response(json.dumps({'error': 'following not found or not owned by user'}), mimetype="application/json", status=404)
        db.session.delete(following)
        db.session.commit()
        return Response(json.dumps({}), mimetype="application/json", status=200)


def initialize_routes(api):
    api.add_resource(
        FollowingListEndpoint, 
        '/api/following', 
        '/api/following/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
    api.add_resource(
        FollowingDetailEndpoint, 
        '/api/following/<int:id>', 
        '/api/following/<int:id>/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
