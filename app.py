from flask import Flask, render_template, jsonify, send_from_directory
from flaskext.markdown import Markdown
from markdown import markdown

app = Flask(__name__)
Markdown(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat')
def chat():
    with open('chat.md', 'r') as f:
        content = f.read()
        html_content = markdown(content)
        return html_content

@app.route('/start')
def start():
    # Implement stopwatch logic to start the timer
    # Return a JSON response indicating success
    return jsonify({'status': 'success'})

@app.route('/stop')
def stop():
    # Implement stopwatch logic to stop the timer
    # Return a JSON response indicating success
    return jsonify({'status': 'success'})

@app.route('/reset')
def reset():
    # Implement stopwatch logic to reset the timer
    # Return a JSON response indicating success
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
