##################################################
#               넥스트 유니콘 크롤링                #
# python nextunicorn.py -init_file my_init_file  #
# -init_file: init 파일 이름                      #
#   - 없으면 새로운 데이터 생성                      #
##################################################


from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
from datetime import datetime
import sys, time, argparse

# 한글 깨짐 방지
sys.stdout.reconfigure(encoding="utf-8")


# 초기화
# def initialize(driver):
def get_max_page(driver):
  driver.get("https://www.nextunicorn.kr/templates/ir-deck?page=1")
  # # 해당 페이지 a 태그 찾기
  # enterprise_container =  driver.find_elements(By.CLASS_NAME, "css-1v8gcgw.e1ajonlm13")
  # # 목록 당 카드수
  # num_of_cards = len(enterprise_container)

  # 페이지네이션 최대값 찾기
  pagination = driver.find_elements(By.CLASS_NAME, "css-1nuh5o8.eqfa1x60")
  max_page_num = pagination[-1].text

  # # 첫페이지 페이지 기업 리스트 가져오기
  # enterprise_list = get_enterprise_list(driver)

  # return num_of_cards, int(max_page_num), enterprise_list
  return int(max_page_num)


# 기업 명단 가져오기
def get_enterprise_list(driver):
  # 해당 페이지 a 태그 찾기
  enterprise_container =  driver.find_elements(By.CLASS_NAME, "css-1v8gcgw.e1ajonlm13")

  # 해당 페이지 기업 리스트 가져오기
  enterprise_list = []
  for card in enterprise_container:
    info = {}

    # 상세페이지 url
    info['url'] = card.get_attribute('href')

    # 기업 이름
    name_element = card.find_element(By.CLASS_NAME, "IR-title")
    info['name'] = name_element.text

    # 기업 분야
    area_elements = card.find_elements(By.XPATH, ".//div[2]/span")
    area = ', '.join([x.text for x in area_elements])
    info['area'] = area

    enterprise_list.append(info)

  return enterprise_list


def get_init(driver, max_page = 16, init_file = ''):

  # init_file이 주어진 경우
  if init_file:
    try:
      df = pd.read_csv(init_file, encoding="utf-8-sig")
      print(f"파일 {init_file}을 성공적으로 불러왔습니다!")
      return df  # CSV 데이터를 반환하고 크롤링을 실행하지 않음
    except FileNotFoundError:
      print(f"파일 {init_file}을 찾을 수 없습니다. 새 데이터를 크롤링합니다.")

  # init_file이 없는 경우
  print('새 데이터를 크롤링합니다...')

  # 초기 세팅
  page = 1 # 현재 목록 페이지
  enterprise_list = [] # 기업 리스트
  
  while page <= max_page:
    driver.get(f"https://www.nextunicorn.kr/templates/ir-deck?page={page}")
    time.sleep(2)

    current_list = get_enterprise_list(driver)
    enterprise_list.extend(current_list)

    page+=1

  print(len(enterprise_list))

  init_df = pd.DataFrame(enterprise_list)
  init_df.to_csv(f'기업정보_init_{datetime.today().strftime("%Y%m%d")}.csv', index=True, encoding="utf-8-sig")

  return init_df


# step4.원하는 회사의 리뷰 페이지까지 이동 함수
def get_detail(driver, url):
  driver.get(url)
  time.sleep(3)

  additional_info = {}

  # 투자 정보 가져오기
  # investment_phase_container = driver.find_element(By.XPATH, "//*[@id='__next']/div[2]/div/div/div[2]/div/section[1]/div[8]/div[2]/div[1]")
  investment_info_container = driver.find_element(By.XPATH, "//p[contains(text(), '투자 단계')]/parent::div/parent::div")
  # 투자 단계
  phase = investment_info_container.find_element(By.XPATH,".//p[contains(text(), '투자 단계')]/following-sibling::p")
  additional_info['투자 단계'] = phase.text.strip()
  # 투자 금액
  amount = investment_info_container.find_element(By.XPATH,".//p[contains(text(), '투자 금액')]/following-sibling::p")
  additional_info['투자 금액'] = amount.text.strip()
  # 제작 년도
  created_at = investment_info_container.find_element(By.XPATH,".//p[contains(text(), '제작 년도')]/following-sibling::p")
  additional_info['제작 년도'] = created_at.text.strip()
  

  # 기업 소개 가져오기
  information_container = driver.find_element(By.CLASS_NAME, "css-1kx1l6e.e1qnoogd25")

  # 기업 소개
  try:
    introduction = information_container.find_element(By.XPATH, ".//span[contains(text(),'소개')]/parent::*")
    # introduction = information_container.find_element(By.XPATH, ".//*[@class='editor__h3']//span[text(), '소개')] | .//*[@class='editor__h4']//span[contains(text(), '소개')]")
    introduction_content = introduction.find_element(By.XPATH, "./following-sibling::p")
    additional_info['기업 소개'] = introduction_content.text.strip()
    # print('기업 소개:',additional_info['기업 소개'] )
  except:
    # print('기업 소개 실패')
    pass

  # 기업 정보
  try:
    # 전체 h4 태그 중 하위에 strong 태그를 가지고 있으며 '기업 정보'를 text로 가지고 있는 요소
    information = information_container.find_element(By.XPATH, ".//span[contains(text(),'기업 정보')]/parent::*")
    information_content = information.find_element(By.XPATH, "./following-sibling::p")
    additional_info['기업 정보'] = information_content.text.strip()
    # print('기업 정보1:', additional_info['기업 정보'])
  except:
    # print('기업 정보 실패')
    pass
  try:
    # 전체 h4 태그 중 하위에 strong 태그를 가지고 있으며 '기업 정보'를 text로 가지고 있는 요소
    information = information_container.find_element(By.XPATH, ".//strong[contains(text(), '기업 정보')]/parent::*/parent::*")
    information_content = information.find_element(By.XPATH, "./following-sibling::p")
    additional_info['기업 정보'] = information_content.text.strip()
    # print('기업 정보2:', additional_info['기업 정보'])
  except:
    # print('기업 정보 실패')
    pass

  # 만약 별도의 기업 소개 h4 태그가 없다면
  if ('기업 소개' not in additional_info):
    try:
      introductions = information_container.find_elements(By.CLASS_NAME, "editor__paragraph")
      if len(introductions) > 1:
        additional_info['기업 소개'] = information_container.text.strip()
      else:
        additional_info['기업 소개'] = introductions[0].text.strip()
      # print('전체 소개:', additional_info['기업 소개'])
    except:
      # print('전체 소개 실패')
      pass

  # 전체 내용
  additional_info['전체 내용'] = information_container.text

  return additional_info

def create_data(driver, df):

  # dataFrame에 빈 열 추가
  df['투자 단계'] = ""
  df['투자 금액'] = ""
  df['제작 년도'] = ""
  df['기업 소개'] = ""
  df['기업 정보'] = ""
  df['전체 내용'] = ""

  # url = 'https://www.nextunicorn.kr/templates/ir-deck/detail/111e595dbb807c03'
  # info = get_detail(driver, url)
  # print(info.keys())
  # for key, value in info.items():
  #   print(key)
  #   print(value)

  total_num = df.shape[0]

  for index, row in df.iterrows():
    if (index+1)%20 == 0:
      print(f'{index+1} / {total_num}')

    additinoal_info = get_detail(driver, row['url'])

    for key, value in additinoal_info.items():
      df.at[index, key] = value
    

  # csv 파일로 저장
  df.to_csv(f'기업정보_{datetime.today().strftime("%Y%m%d")}.csv', index=False, encoding="utf-8-sig")


def  main():
  # ArgumentParser
  parser = argparse.ArgumentParser(description='필요한 경우 -init_file 입력')

  parser.add_argument('-init_file', type=str, default="", help='init file 이름 입력')

  args = parser.parse_args()

  # 
  driver = webdriver.Chrome()



  # 마지막 페이지 번호 가져오기
  max_page = get_max_page(driver)

  # 초기 데이터 가져오기
  df = get_init(driver, max_page=max_page, init_file=args.init_file)

  # # dataFrame에 빈 열 추가
  # df['투자 단계'] = ""
  # df['투자 금액'] = ""
  # df['제작 년도'] = ""
  # df['기업 소개'] = ""
  # df['기업 정보'] = ""
  # df['전체 내용'] = ""


  # total_num = df.shape[0]

  # for index, row in df.iterrows():
  #   if (index+1)%20 == 0:
  #     print(f'{index+1} / {total_num}')

  #   additinoal_info = get_detail(driver, row['url'])

  #   for key, value in additinoal_info.items():
  #     df.at[index, key] = value
    

  # # csv 파일로 저장
  # df.to_csv(f'기업정보_{datetime.today().strftime("%Y%m%d")}.csv', index=False, encoding="utf-8-sig")

  # csv 파일 생성
  create_data(driver, df)

  # # 크롬 드라이버 종료
  driver.close()

  print()
  print()
  print('크롤링을 종료합니다.')



if __name__  ==  "__main__":

  main()
