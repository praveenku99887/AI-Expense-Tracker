import pandas as pd


def read_csv(file_path: str):
    """
    Read any CSV file and convert it to JSON records.
    No fixed column validation.
    """

    df = pd.read_csv(file_path)

    # Remove extra spaces from column names
    df.columns = [str(col).strip() for col in df.columns]

    # Replace NaN with empty string
    df = df.fillna("")

    # Convert all rows to dictionaries
    return df.to_dict(orient="records")