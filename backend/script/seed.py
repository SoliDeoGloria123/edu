
from config.dbConfig import init_db
from Models.users import User
from config.security import hash_password

def seed_users():
    users = [
        User(name="Juan", username="juan123", email="juan@example.com", password=hash_password("1234"), is_active=True),
        User(name="Ana", username="ana456", email="ana@example.com", password=hash_password("abcd"), is_active=True),
        User(name="Luis", username="luis789", email="luis@example.com", password=hash_password("pass"), is_active=False),
        User(name="Maria", username="maria321", email="maria@example.com", password=hash_password("maria"), is_active=True),
        User(name="Pedro", username="pedro654", email="pedro@example.com", password=hash_password("pedro"), is_active=False),
        User(name="Carlos", username="carlos987", email="carlos@example.com", password=hash_password("carlos"), is_active=True),
        User(name="Sofia", username="sofia111", email="sofia@example.com", password=hash_password("sofia"), is_active=False),
        User(name="Miguel", username="miguel222", email="miguel@example.com", password=hash_password("miguel"), is_active=True),
        User(name="Laura", username="laura333", email="laura@example.com", password=hash_password("laura"), is_active=True),
        User(name="Diego", username="diego444", email="diego@example.com", password=hash_password("diego"), is_active=False),
        User(name="Elena", username="elena555", email="elena@example.com", password=hash_password("elena"), is_active=True),
        User(name="Roberto", username="roberto666", email="roberto@example.com", password=hash_password("roberto"), is_active=False),
        User(name="Isabel", username="isabel777", email="isabel@example.com", password=hash_password("isabel"), is_active=True),
        User(name="Fernando", username="fernando888", email="fernando@example.com", password=hash_password("fernando"), is_active=True),
        User(name="Carmen", username="carmen999", email="carmen@example.com", password=hash_password("carmen"), is_active=False)
    ]
    for user in users:
        init_db("users", user)

if __name__ == "__main__":
    seed_users()
