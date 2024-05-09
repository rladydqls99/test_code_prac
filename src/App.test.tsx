import Pagenation from "./App";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const PAGE_NUMBER_TEST_ID = "page-number";

// 공통된 부분 분리
// 디폴트 값을 주어서 예외처리를 할 수 있음
const renderPageNumbers = (itemsPerPage: number = 3) => {
  render(
    <Pagenation
      totalItems={9}
      itemsPerPage={itemsPerPage}
      pageNumberTestId={PAGE_NUMBER_TEST_ID}
    />
  );

  const prevBtn = screen.getByText(/previous/i);
  const nextBtn = screen.getByText(/next/i);

  return { prevBtn, nextBtn };
};

describe("App", () => {
  test("컴포넌트 렌더링", () => {
    const { prevBtn, nextBtn } = renderPageNumbers();

    // 해당 페이지 넘버에 테스트 아이디가 있는가?
    const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    pageNumbers.forEach((pageNumber, index) => {
      expect(pageNumber).toHaveTextContent(`${index + 1}`);
    });

    // 클래스가 잘 적용 됐는가?
    expect(prevBtn).toHaveClass("disabled");
    expect(nextBtn).not.toHaveClass("disabled");
  });

  test("첫 번째 페이지에서는 이전 페이지로 돌아갈 수 없음", () => {
    // Arrange 단계
    const { prevBtn } = renderPageNumbers(2);

    // Act 단계
    // 이전 버튼을 테스트시 한 번 클릭하는 동작
    fireEvent.click(prevBtn);

    // Assert 단계
    expect(prevBtn).toHaveClass("disabled");
  });

  test("중간 페이지에서는 이전, 다음 페이지로 이동할 수 있음", () => {
    const { prevBtn, nextBtn } = renderPageNumbers();

    fireEvent.click(nextBtn);
    expect(prevBtn).not.toHaveClass("disabled");
    expect(nextBtn).not.toHaveClass("disabled");
  });

  test("마지막 페이지에서는 다음 버튼을 클릭했을 때 다음 페이지로 이동할 수 없음", () => {
    const { nextBtn } = renderPageNumbers();
    fireEvent.click(nextBtn);

    expect(nextBtn).not.toHaveClass("disabled");
  });

  // tdd 테스트 케이스를 먼저 만들고 개발하는 방식
  // 개발 이후 수정 사항이 발생했을 때 바로 코드를 작성하는 것이 아닌 테스트 코드를 먼저 작성하는 방법
  test("페이지 넘버를 클릭하면 해당 페이지로 이동", () => {
    renderPageNumbers();

    const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    fireEvent.click(pageNumbers[1]);
    expect(pageNumbers[1]).toHaveClass("active");
  });
  // test.skip() --> 해당 테스트를 건너뛸 수 있음
});

/*
tdd
  1. 테스트 코드를 만들고 개발을 진행하는 방법
  2. Fake It 방법: 테스트 코드만 작성하도록 만드는 방법
  3. Obvious Implementation: 제대로 작성하는 방법

Red-Green-Refactor
  1. red: 테스트 코드만 작성한 단계
  2. green: 실행 코드를 제대로 작성한 단계
  3. refactor: 코드가 맘에 안들 때 수정하는 단계
*/
