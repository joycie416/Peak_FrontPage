##################################################################################
#                                  사람인 크롤링                                   #
# python saramin.py -date 20210801 -init_start 1 -detail_start 1 -MAX_PAGE 24702 #
# -date: 특정 파일 생성일                                                          #
# -init_start: init 데이터 생성 시작하는 인덱스                                      #
#   - 만약 1보다 작은 수를 입력하면 init 데이터 생성 과정 생략                          #
# -detail_start: 세부정보 생성 시작하는 인덱스                                       #
# -MAX_PAGE: 사람인 기업 목록 마지막 페이지                                          #
##################################################################################

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
from datetime import datetime
import sys, glob, time, argparse

# 한글 깨짐 방지
sys.stdout.reconfigure(encoding="utf-8")


# 팝업이 있으면 닫기
def check_popup(driver):
  try:
    popup_close_btn = driver.find_element(By.CSS_SELECTOR, '#wrap_review_tutorial > div > button')
    popup_close_btn.click()
  except:
    pass


# 기업 명단 가져오기
def get_enterprise_list(driver):
  # 팝업이 있으면 닫기
  check_popup(driver)

  # 해당 페이지 기업 카드 찾기
  enterprise_cards =  driver.find_elements(By.CSS_SELECTOR, "#sync_row > .row > a")

  # 해당 페이지 기업 리스트 가져오기
  enterprise_list = []
  for card in enterprise_cards:
    info = {}

    # 상세페이지 key
    info['key'] = card.get_attribute('href').split('=')[1]

    # 기업 이름
    name_element = card.find_element(By.CSS_SELECTOR, "a > div.info > strong")
    info['name'] = name_element.text

    enterprise_list.append(info)

  return enterprise_list


# 페이지 넘겨주기
def turn_page(driver, cur_page):
  page = 1
  move_page = cur_page//5 * 5 + 1

  while page != cur_page:
    # 팝업이 있으면 닫기
    check_popup(driver)

    num_buttons = driver.find_elements(By.CSS_SELECTOR,"#sync_row > div.pagination > .page")
    next_button = driver.find_element(By.CSS_SELECTOR,"#sync_row > div.pagination > .btnNext")
    if (page != move_page):
      driver.execute_script("let btn = document.querySelector('.btnNext');if (btn) {"+"btn.setAttribute('data-page', {0});".format(move_page)+"}")
      time.sleep(1)

    if (cur_page-page > 4):
      next_button.click()
      page = move_page
    else:
      num_buttons[page%5].click()
      page+=1
    
    time.sleep(2)


# 초기 데이터 불러오기 혹은 생성하기
def get_init(date = datetime.today().strftime("%Y%m%d"), start = 1, MAX_PAGE = 24702):
  csv_files = glob.glob(f'기업정보_init_*_{date}.csv')

  # # init_file이 없거나 start보다 부족한 경우
  today = datetime.today().strftime("%Y%m%d")
  # 기존 데이터가 있다면 입력 날짜 유지
  if (len(csv_files) > 0 and start <= len(csv_files)):
    today = date

  if start > 0:

    # init_file이 있고 추가 데이터를 안 만드는 경우
    if 0 < len(csv_files) and start < len(csv_files):
      try:
        init_files = [pd.read_csv(file, encoding="utf-8-sig") for file in csv_files]
        print(f"파일 '기업정보_init_*_{date}.csv' {len(csv_files)} 개를 성공적으로 불러왔습니다!")
        print()
        print()
        return init_files, date  # CSV 데이터를 반환하고 크롤링을 실행하지 않음
      except:
        print(f"파일 '기업정보_init_*_{date}.csv'을 찾을 수 없습니다. 새 데이터를 크롤링합니다.")
        print()
        print()


    # 크롬 드라이버 실행
    driver = webdriver.Chrome()

    # 초기 세팅
    count = start
    # csv가 없으면 1 부터
    if len(csv_files) == 0:
      count = 1
    # csv 파일 개수보다 적으면 마지막부터
    elif start <= len(csv_files):
      count = len(csv_files)
    # csv 파일 개수와 count가 같은데 마지막 파일의 데이터 수가 5000이면 그 다음부터
    elif start == len(csv_files) and len(csv_files) < 20 and pd.read_csv(csv_files[-1], encoding="utf-8-sig").shape[0] == 5000:
      count = len(csv_files) + 1
    elif start == 20 and len(csv_files) == 20 and pd.read_csv(csv_files[-1], encoding="utf-8-sig").shape[0] == 3807:
      return [pd.read_csv(file, encoding="utf-8-sig") for file in csv_files], today
    # # csv가 있으면 마지막부터
    # if len(csv_files) > 0:
    #   count = len(csv_files)
    start_page = 1 + 1250 * (count - 1) #1025 # 목록 시작 페이지
    check_page_num = 1250
    max_page = check_page_num + start_page - 1 # 
    page = start_page # 현재 목록 페이지

    driver.get('https://www.saramin.co.kr/zf_user/company-review')
    time.sleep(1.5)
    turn_page(driver, start_page)


    num_buttons = None
    next_button = None

    while start_page <= MAX_PAGE:
      to_break = False
      print('key 데이터를 크롤링합니다...')
      print('현재 크롤링 횟수:', count)
      print()
      print()

      enterprise_list = []

      while page <= max_page:
        if (page-start_page+1)%50 == 0:
          print(page-start_page+1, '/', check_page_num, '...', count)

        # 페이지네이션 버튼
        try:
          num_buttons = driver.find_elements(By.CSS_SELECTOR,"#sync_row > div.pagination > .page")
          next_button = driver.find_element(By.CSS_SELECTOR,"#sync_row > div.pagination > .btnNext")
        except:
          print('다음 버튼 없음')
          to_break = True
          break

        # 현 페이지 기업 목록추가
        current_list = get_enterprise_list(driver)
        enterprise_list.extend(current_list)

        if page%5 == 0:
          # 페이지 5개 클릭할 때마다 다음으로 넘겨줌
          next_button.click()
        else:
          try:
            num_buttons[page%5].click()
          except:
            print('다음 페이지 없음')
            to_break = True
            break
        
        page+=1
        time.sleep(1)

      print(len(enterprise_list))
      start_page += check_page_num
      max_page = start_page + check_page_num - 1

      init_df = pd.DataFrame(enterprise_list)
      init_df.to_csv(f'기업정보_init_{count}_{today}.csv', encoding="utf-8-sig")
      
      count += 1

      if to_break:
        break

    print('종료 페이지:', page-1)

    # 크롬 드라이버 종료
    driver.close()


  # init data 합치기
  print(f"생성된 기업정보_init_*_{today}.csv 데이터를 모두 불러옵니다...")
  print()

  # 모든 CSV 파일 경로 가져오기
  csv_files = glob.glob(f"기업정보_init_*_{today}.csv")  # 현재 디렉토리에 있는 파일 찾기
  print(f'all {len(csv_files)} csv files', csv_files)

  # 모든 CSV 파일을 읽어 리스트에 저장
  df_list = [pd.read_csv(file, encoding="utf-8-sig") for file in csv_files]

  # 하나의 DataFrame으로 합치기
  merged_df = pd.concat(df_list, ignore_index=True)
  merged_df = merged_df.drop(columns=["Unnamed: 0"])  # 불필요한 Unnamed: 0 열 삭제

  print('중복 제거 전:', merged_df.shape)
  # 중복 제거
  merged_df = merged_df.drop_duplicates()
  print('중복 제거 후:', merged_df.shape)

  # 합친 데이터를 새로운 CSV로 저장
  merged_df.to_csv(f'기업정보_init_{today}.csv', encoding="utf-8-sig")

  return df_list, today


# step4.원하는 회사의 리뷰 페이지까지 이동 함수
def get_detail(driver, key):
  driver.get(f"https://www.saramin.co.kr/zf_user/company-info/view?csn={key}")
  # time.sleep(1)

  additional_info = {}

  # 투자 정보 가져오기
  # investment_phase_container = driver.find_element(By.XPATH, "//*[@id='__next']/div[2]/div/div/div[2]/div/section[1]/div[8]/div[2]/div[1]")
  detail_container = None
  try:
    detail_container = driver.find_element(By.CSS_SELECTOR, ".company_details")
  except:
    pass
  # 업종
  try:
    phase = detail_container.find_element(By.XPATH,".//dt[contains(text(), '업종')]/following-sibling::dd")
    additional_info['업종'] = phase.text.strip()
  except:
    pass
  # 대표자명
  try:
    amount = detail_container.find_element(By.XPATH,".//dt[contains(text(), '대표자명')]/following-sibling::dd")
    additional_info['대표자명'] = amount.text.strip()
  except:
    pass
  # 홈페이지
  try:
    created_at = detail_container.find_element(By.XPATH,".//dt[contains(text(), '홈페이지')]/following-sibling::dd")
    additional_info['홈페이지'] = created_at.text.strip()
  except:
    pass
  # 사업내용
  try:
    created_at = detail_container.find_element(By.XPATH,".//dt[contains(text(), '사업내용')]/following-sibling::dd")
    additional_info['사업내용'] = created_at.text.strip()
  except:
    pass
  # 주소
  try:
    created_at = detail_container.find_element(By.XPATH,".//dt[contains(text(), '주소')]/following-sibling::dd")
    additional_info['주소'] = created_at.text.strip()
  except:
    pass
  # 기업 소개
  try:
    information_container = driver.find_element(By.CLASS_NAME, "company_introduce")
    additional_info['기업소개'] = information_container.text
  except:
    pass

  return additional_info

def create_partial_data(driver, df_list, date, start = 1):
  for df_idx, df in enumerate(df_list):
    # 이미 변환된 데이터는 손보지 않는 경우
    if (df_idx + 1 < start):
      continue

    print(f'{df_idx + 1}번째 데이터를 수정중입니다...')

    # # dataFrame에 빈 열 추가
    df['업종'] = ""
    df['대표자명'] = ""
    df['홈페이지'] = ""
    df['사업내용'] = ""
    df['주소'] = ""
    df['기업소개'] = ""

    total_num = df.shape[0]

    for idx, row in df.iterrows():
      if (idx+1)%20 == 0:
        print(f'{idx+1} / {total_num} ... {df_idx+1}')

      additinoal_info = get_detail(driver, row['key'])

      for key, value in additinoal_info.items():
        df.at[idx, key] = value

    df.drop(columns=["Unnamed: 0"])
    df.to_csv(f'기업정보_{df_idx+1}_{date}.csv', encoding="utf-8-sig")
    df = pd.DataFrame(columns=df.columns)


def main():
  # ArgumentParser
  parser = argparse.ArgumentParser(description='필요한 경우 -date, -init_start, -detail_start, -MAX_PAGE 입력')

  parser.add_argument('-date', type=str, default=datetime.today().strftime("%Y%m%d"), help='원하는 날짜 -date 입력')
  parser.add_argument('-init_start', type=int, default=1, help='특정 페이지부터 다시 init 데이터 생성하려면 -count 입력')
  parser.add_argument('-detail_start', type=int, default=1, help='특정 init부터 다시 detailed 데이터 생성하려면 -count 입력')
  parser.add_argument('-MAX_PAGE', type=int, default=24702, help='특정 page까지 데이터 생성하려면 -MAX_PAGE 입력')

  args = parser.parse_args()

  # 초기 데이터 가져오기
  df_list, date = get_init(date=args.date, start=args.init_start, MAX_PAGE=args.MAX_PAGE)


  driver = webdriver.Chrome()

  # # url = 'https://www.nextunicorn.kr/templates/ir-deck/detail/111e595dbb807c03'
  # # info = get_detail(driver, url)
  # # print(info.keys())
  # # for key, value in info.items():
  # #   print(key)
  # #   print(value)
  

  create_partial_data(driver, df_list, date, start=args.detail_start)

  # 크롬 드라이버 종료
  driver.close()

  print()
  print()
  print('크롤링을 종료합니다.')



if __name__  ==  "__main__":

  main()
