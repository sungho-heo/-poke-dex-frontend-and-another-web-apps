import React, { useState } from "react";

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void; // 이전에 사용했던 void 비어있는 함수라는 의미를 가지고있음.
};

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      description: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
