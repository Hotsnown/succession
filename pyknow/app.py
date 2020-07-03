from flask import Flask, jsonify, request, make_response, abort
from qualification import Blood_relationship_KE
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/todo/api/v1.0/tasks', methods=['POST'])
def read_family_graph():
    if not request.json or not ('family' and 'de_cujus') in request.json:
        abort(400)
    return jsonify({'task': Blood_relationship_KE(request.json['family'], request.json['de_cujus'])}), 201

if __name__ == '__main__':
    app.run(debug=True)