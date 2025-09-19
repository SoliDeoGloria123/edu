
from config.dbConfig import init_db
from Models.users import User

def seed_users():
    users = [
        User(name="Juan", username="juan123", email="juan@example.com", password="1234", is_active=True),
        User(name="Ana", username="ana456", email="ana@example.com", password="abcd", is_active=True),
        User(name="Luis", username="luis789", email="luis@example.com", password="pass", is_active=False),
        User(name="Maria", username="maria321", email="maria@example.com", password="maria", is_active=True),
        User(name="Pedro", username="pedro654", email="pedro@example.com", password="pedro", is_active=False),
        User(name="Carlos", username="carlos987", email="carlos@example.com", password="carlos", is_active=True),
        User(name="Sofia", username="sofia111", email="sofia@example.com", password="sofia", is_active=False),
        User(name="Miguel", username="miguel222", email="miguel@example.com", password="miguel", is_active=True),
        User(name="Laura", username="laura333", email="laura@example.com", password="laura", is_active=True),
        User(name="Diego", username="diego444", email="diego@example.com", password="diego", is_active=False),
        User(name="Elena", username="elena555", email="elena@example.com", password="elena", is_active=True),
        User(name="Roberto", username="roberto666", email="roberto@example.com", password="roberto", is_active=False),
        User(name="Isabel", username="isabel777", email="isabel@example.com", password="isabel", is_active=True),
        User(name="Fernando", username="fernando888", email="fernando@example.com", password="fernando", is_active=True),
        User(name="Carmen", username="carmen999", email="carmen@example.com", password="carmen", is_active=False)
    ]
    for user in users:
        init_db("users", user)

if __name__ == "__main__":
    seed_users()
