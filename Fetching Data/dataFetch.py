import os
import requests
import psycopg2
import logging
from dotenv import load_dotenv
from prettytable import PrettyTable

# Global variables to store fetched data
fetched_data = []
fetched_financialdata = []

# Load environment variables from .env file
load_dotenv()

# Function to handle database connection and operations
def db_connect():
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT")
        )
        return conn
    except Exception as e:
        logging.error(f"Database connection error: {e}")
        return None

# Function to fetch data from an API
def fetch_data(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        return response.json()
    except Exception as e:
        logging.error(f"Error fetching data from {api_url}: {e}")
        return []

# Function to insert data into PostgreSQL
def insert_data(data, table_name, columns, values):
    if not data:
        print(f"No data available to insert into {table_name}. Please fetch data first.")
        return

    conn = db_connect()
    if conn:
        try:
            with conn.cursor() as cur:
                for item in data:
                    try:
                        cur.execute(
                            f"INSERT INTO {table_name} ({columns}) VALUES ({values})",
                            item
                        )
                    except Exception as e:
                        logging.error(f"Error inserting record into {table_name}: {e}")
            conn.commit()
            print(f"{len(data)} records inserted into {table_name}.")
        except Exception as e:
            logging.error(f"Error inserting data into {table_name}: {e}")
        finally:
            conn.close()

# Function to display data from PostgreSQL in a table format
def display_data(table_name, column_names):
    conn = db_connect()
    if conn:
        try:
            with conn.cursor() as cur:
                cur.execute(f"SELECT * FROM {table_name}")
                rows = cur.fetchall()

                if rows:
                    table = PrettyTable()
                    table.field_names = column_names
                    for row in rows:
                        table.add_row(row)
                    print(table)
                else:
                    print(f"No data found in {table_name}.")
        except Exception as e:
            logging.error(f"Error fetching data from {table_name}: {e}")
        finally:
            conn.close()

# Wrapper functions for property-specific data
def fetch_property_data():
    global fetched_data
    fetched_data = fetch_data('https://jsonplaceholder.typicode.com/users')
    print(f"Fetched {len(fetched_data)} records from API.")

def insert_property_data():
    insert_data(
        [(item['name'], item['username'], 10, 8, 2, 80, '2024-09-01') for item in fetched_data],
        "property.properties",
        "owner_name, property_name, total_units, filled_units, vacant_units, occupancy_rate, last_maintenance_date",
        "%s, %s, %s, %s, %s, %s, %s"
    )

def display_properties():
    display_data(
        "property.properties",
        ["ID", "Owner Name", "Property Name", "Total Units", "Filled Units", "Vacant Units", "Occupancy Rate", "Last Maintenance Date"]
    )

# Wrapper functions for financial-specific data
def fetch_financial_data():
    global fetched_financialdata
    fetched_financialdata = fetch_data('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1')
    print(f"Fetched {len(fetched_financialdata)} records from API.")

def insert_financial_data():
    insert_data(
        [(item['id'], item['name'], item['current_price'], item['total_volume'], item['high_24h'], item['ath']) for item in fetched_financialdata],
        "financial.financial_data",
        "id, name, current_price, total_volume, high_24h, ath",
        "%s, %s, %s, %s, %s, %s"
    )

def display_financial_data():
    display_data(
        "financial.financial_data",
        ["ID", "Name", "Current Price", "Total Volume", "High_24h", "ath"]
    )

# Main function for handling user operations
def main():
    while True:
        print("\nSelect the category of data you want to fetch:")
        print("1. Property")
        print("2. Financial")
        print("3. Exit")
        category_choice = input("Enter your choice (1-3): ")

        if category_choice == '1':
            print("\nSelect an operation:")
            print("1. Fetch data from API and insert into database")
            print("2. Fetch All Properties (in Tabular Format)")
            print("3. Exit")
            operation_choice = input("Enter your choice (1-3): ")

            if operation_choice == '1':
                fetch_property_data()
                insert_property_data()
            elif operation_choice == '2':
                display_properties()
            elif operation_choice == '3':
                break
            else:
                print("Invalid choice. Please select a valid operation.")

        elif category_choice == '2':
            print("\nSelect an operation:")
            print("1. Fetch data from API and insert into database")
            print("2. Fetch All Financial Data (in Tabular Format)")
            print("3. Exit")
            operation_choice = input("Enter your choice (1-3): ")

            if operation_choice == '1':
                fetch_financial_data()
                insert_financial_data()
            elif operation_choice == '2':
                display_financial_data()
            elif operation_choice == '3':
                break
            else:
                print("Invalid choice. Please select a valid operation.")

        elif category_choice == '3':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please select a valid category.")

if __name__ == "__main__":
    main()
