"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    mothersName: "",
    telephone: "",
    address: "",
    workSituation: "",
    firstSignature: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("print-data");
    if (savedData) {
      setForm(JSON.parse(savedData));
    }
  }, []);

  // Máscara para CPF: 000.000.000-00
  const formatCPF = (value: string) => {
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.slice(0, 11); // Limita a 11 dígitos
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  };

  // Máscara para telefone: (00) 00000-0000
  const formatTelephone = (value: string) => {
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.slice(0, 11); // Limita a 11 dígitos
    if (value.length <= 10) {
      // formato (00) 0000-0000
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      // formato (00) 00000-0000
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
    return value;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      setForm({ ...form, cpf: formatCPF(value) });
    } else if (name === "telephone") {
      setForm({ ...form, telephone: formatTelephone(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.workSituation === "") {
      alert("Por favor, selecione a Situação de Trabalho.");
      return;
    }

    if (form.firstSignature === "") {
      alert("Por favor, informe se é a Primeira Assinatura.");
      return;
    }

    // Para salvar só números puros (sem máscara), se quiser:
    // const cleanCPF = form.cpf.replace(/\D/g, "");
    // const cleanTelephone = form.telephone.replace(/\D/g, "");

    localStorage.setItem("print-data", JSON.stringify(form));
    window.location.href = "/print";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Formulário de Cadastro
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white  border border-neutral-700 p-6 rounded-xl shadow-md w-full max-w-xl space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF (somente números)"
          value={form.cpf}
          onChange={handleChange}
          required
          minLength={14} // conta os pontos e traço: xxx.xxx.xxx-xx
          maxLength={14}
          pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="mothersName"
          placeholder="Nome da Mãe"
          value={form.mothersName}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="telephone"
          placeholder="Telefone"
          value={form.telephone}
          onChange={handleChange}
          required
          minLength={14} // (xx) xxxx-xxxx
          maxLength={15} // (xx) xxxxx-xxxx
          pattern="\(\d{2}\) \d{4,5}-\d{4}"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Endereço"
          value={form.address}
          onChange={handleChange}
          required
          rows={2}
          className="w-full border px-4 py-2 rounded resize-none"
        />

        <div>
          <p className="font-semibold mb-2">Situação de Trabalho:</p>

          {[
            ["0", "Apresentou comprovante de trabalho lícito: SIM"],
            ["1", "Apresentou comprovante de trabalho lícito: NÃO"],
            ["2", "Não está trabalhando - foi encaminhado para FUNAC"],
            ["3", "Dispensa legal"],
            ["4", "Apresentou comprovante da impossibilidade de trabalhar: SIM"],
            ["5", "Apresentou comprovante da impossibilidade de trabalhar: NÃO"],
          ].map(([value, label]) => (
            <label className="block mb-1" key={value}>
              <input
                type="radio"
                name="workSituation"
                value={value}
                checked={form.workSituation === value}
                onChange={handleChange}
              />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>

        <div>
          <p>É a Primeira Assinatura?</p>
          <label className="block mb-1">
            <input
              type="radio"
              name="firstSignature"
              value="0"
              checked={form.firstSignature === "0"}
              onChange={handleChange}
            />
            <span className="ml-2">SIM</span>
          </label>
          <label className="block mb-1">
            <input
              type="radio"
              name="firstSignature"
              value="1"
              checked={form.firstSignature === "1"}
              onChange={handleChange}
            />
            <span className="ml-2">NÃO</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Gerar Documento
        </button>
      </form>
    </div>
  );
}
