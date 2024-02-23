"use client";
import { format, set } from "date-fns";
import { useCallback, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * 日付を選択するためのカスタムフック
 *
 * @param initialDate 初期値
 * @param onChange 日付が変更されたときに呼ばれる関数
 * @returns
 * - date: 選択された日付
 * - setDate: 日付を設定する関数
 * - component: 日付を選択するためのコンポーネント
 */
export const useDatePicker = ({
  initialDate = new Date(),
  onChange = () => {},
}: Partial<{
  initialDate: Date;
  onChange: (date: Date) => void;
}> = {}) => {
  const [date, setDate] = useState(initialDate);

  const dateRef = useRef<Date>(new Date());

  const handleSetDate = useCallback(
    (d: Date) => {
      setDate(d);
      onChange(d);
    },
    [onChange],
  );

  const component = useCallback(
    () => (
      <DatePicker
        className="border-2 border-gray-300 rounded-lg p-2 w-96 text-gray-900"
        dateFormat="yyyy/MM/dd HH:mm"
        selected={date}
        onChange={(d) => {
          if (!d) return;

          // HACK: onChangeは、日付、時間を設定した時どちらも呼ばれてくる。
          // 時間を指定した時だけsetDateをしたい（=ダイアログを閉じるようにしたい）ため、日付が変わったかどうかで処理を変える
          const isDateChanged =
            format(d, "yyyy/MM/dd") !== format(date, "yyyy/MM/dd");

          if (isDateChanged) {
            // 時間が変更されていない場合は、refに日付を保存するだけ（ここでsetDateするとダイアログが閉じてしまう）
            dateRef.current = d;
          } else {
            // 時間が設定されたときは、refに保存した日付に時間をセットして目的の日付・時間を作ってセットする
            const newDate = set(dateRef.current, {
              hours: d.getHours(),
              minutes: d.getMinutes(),
            });
            handleSetDate(newDate);
          }
        }}
        onCalendarClose={() => {
          // 日付だけが変更された場合はここに来る。その場合はrefに保存した日付をセットする
          handleSetDate(dateRef.current);
        }}
        showTimeSelect
        timeIntervals={5}
        timeFormat="HH:mm"
        showTwoColumnMonthYearPicker
      />
    ),
    [date, handleSetDate],
  );

  return {
    date,
    setDate,
    component,
  };
};
