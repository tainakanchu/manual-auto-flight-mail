"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * 日付を選択するためのカスタムフック
 *
 * @param initialDate 初期値
 * @returns
 * - date: 選択された日付
 * - setDate: 日付を設定する関数
 * - component: 日付を選択するためのコンポーネント
 */
export const useDatePicker = ({
  initialDate = new Date(),
  onChange = () => {},
}: {
  initialDate?: Date;
  onChange?: (date: Date) => void;
}) => {
  const [date, setDate] = useState(initialDate);

  const component = () => (
    <DatePicker
      className="border-2 border-gray-300 rounded-lg p-2 w-96 text-gray-900"
      dateFormat="yyyy/MM/dd HH:mm"
      locale="ja"
      selected={date}
      onChange={(d) => {
        if (d) {
          setDate(d);
          onChange(d);
        }
      }}
      showTimeSelect
      timeIntervals={5}
      timeFormat="HH:mm"
    />
  );

  return {
    date,
    setDate,
    component,
  };
};
