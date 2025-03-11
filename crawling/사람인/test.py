import pandas as pd
import glob
from datetime import datetime
import os, sys

# 한글 깨짐 방지
sys.stdout.reconfigure(encoding="utf-8")
os.chdir("사람인")  # 예시 경로

print("현재 작업 디렉토리:", os.getcwd())

# 모든 CSV 파일 경로 가져오기
csv_files = glob.glob("기업정보_init_*.csv")  # 현재 디렉토리에 있는 파일 찾기
print('all csv files', csv_files)

# 모든 CSV 파일을 읽어 리스트에 저장
df_list = [pd.read_csv(file, encoding="utf-8-sig") for file in csv_files]

# 하나의 DataFrame으로 합치기
merged_df = pd.concat(df_list, ignore_index=True)
merged_df = merged_df.drop(columns=["Unnamed: 0"])  # Unnamed: 0 열 삭제

# 결과 출력
print(merged_df.head())

# 만약 합친 데이터를 새로운 CSV로 저장하고 싶다면
# merged_df.to_csv("기업정보_merged.csv", index=False, encoding="utf-8-sig")
print(merged_df.shape)

# 중복 제거
merged_df = merged_df.drop_duplicates()
print(merged_df.shape)

merged_df.to_csv(f'기업정보_init_{datetime.today().strftime("%Y%m%d")}.csv', encoding="utf-8-sig")
