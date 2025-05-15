import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="당신의 상황을 입력하세요 (예: 영상 편집하고 싶어요)"
        className="w-full max-w-xl border rounded-full px-4 py-2 text-sm shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
} 