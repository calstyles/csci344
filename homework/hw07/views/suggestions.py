from flask import Response, request
from flask_restful import Resource
from models import User
from views import get_authorized_user_ids
import json

class SuggestionsListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def get(self):
        authorized_user_ids = get_authorized_user_ids(self.current_user)
        all_user_ids = [user.id for user in User.query.all()]
        suggested_user_ids = [id for id in all_user_ids if id not in authorized_user_ids]
        suggested_user_ids = suggested_user_ids[:7]
        suggested_users = [user.to_dict() for user in User.query.filter(User.id.in_(suggested_user_ids))]
        return Response(json.dumps(suggested_users), mimetype="application/json", status=200)


def initialize_routes(api):
    api.add_resource(
        SuggestionsListEndpoint, 
        '/api/suggestions', 
        '/api/suggestions/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
