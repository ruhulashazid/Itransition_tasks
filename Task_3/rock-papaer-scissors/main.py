import sys
import random
import time
from KeyGenerator import KeyGenerator
from HMACGenerator import HMACGenerator
from GameRules import GameRules
from HelpTable import HelpTable

def main():
    # Command-line arguments validation
    if len(sys.argv) < 4 or len(sys.argv[1:]) % 2 == 0:
        print("Error: Provide an odd number of at least 3 non-repeating moves.")
        print("Example: python main.py rock paper scissors")
        return

    moves = sys.argv[1:]

    if len(moves) != len(set(moves)):
        print("Error: Moves must be unique.")
        return

    key = KeyGenerator.generate_key()
    computer_move = random.choice(moves)
    hmac = HMACGenerator.generate_hmac(key, computer_move)

    print(f"HMAC: {hmac}")
    print("Available moves:")
    for i, move in enumerate(moves, 1):
        print(f"{i} - {move}")
    print("0 - exit")
    print("? - help")

    move_counter = 0  # Initialize move counter
    max_moves = 10  # Maximum allowed moves

    while True:
        remaining_moves = max_moves - move_counter  # Calculate remaining moves
        user_input = input(f"Enter your move (Auto-off after {remaining_moves} more moves): ")

        if user_input == "0":
            print("Game over.")
            break
        elif user_input == "?":
            table = HelpTable.generate_table(moves)
            HelpTable.print_table(table)
        elif user_input.isdigit() and 1 <= int(user_input) <= len(moves):
            user_move = moves[int(user_input) - 1]
            print(f"Your move: {user_move}")
            print(f"Computer move: {computer_move}")
            rules = GameRules(moves)
            result = rules.determine_winner(user_move, computer_move)
            print(result)
            print(f"HMAC key: {key.hex()}")
            move_counter += 1  # Increment move counter

            # Check if move limit is reached
            if move_counter >= max_moves:
                print("Auto-off: Maximum move limit reached.")
                break

            # Optionally, generate a new computer move each round
            computer_move = random.choice(moves)
            hmac = HMACGenerator.generate_hmac(key, computer_move)
        else:
            print("Invalid input. Please try again.")

if __name__ == "__main__":
    main()
