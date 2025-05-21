"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

function getHoraAtual(): string {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
}

function formatCPF(cpf: string): string {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function formatTelefone(telefone: string): string {
  const digits = telefone.replace(/\D/g, "");

  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return telefone;
}

interface Data {
  name: string;
  mothersName: string;
  cpf: string;
  telephone: string;
  address: string;
  workSituation: 0 | 1 | 2 | 3 | 4 | 5;
  firstSignature: 0 | 1;
}

export default function PrintPage() {
  const [data, setData] = useState<Data | null>(null);
  const [dataAtual, setDataAtual] = useState("");
  const [proximaTerca, setProximaTerca] = useState("");
  const [horaAtual, setHoraAtual] = useState("");

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("print-data");
        if (saved) {
          const parsedData = JSON.parse(saved) as Data;
          setData(parsedData);
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }

      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, "0");
      const nomeMes = meses[hoje.getMonth()];
      const ano = hoje.getFullYear();
      setDataAtual(`${dia} de ${nomeMes.toUpperCase()} de ${ano}`);
      setHoraAtual(getHoraAtual());

      // Próxima terça-feira
      const TUESDAY = 2;
      const dayOfWeek = hoje.getDay();
      let daysToAdd = (TUESDAY - dayOfWeek + 7) % 7;
      if (daysToAdd === 0) daysToAdd = 7;

      const proximaTercaData = new Date();
      proximaTercaData.setDate(hoje.getDate() + daysToAdd);

      const diaTerca = String(proximaTercaData.getDate()).padStart(2, "0");
      const mesTerca = meses[proximaTercaData.getMonth()];
      const anoTerca = proximaTercaData.getFullYear();

      setProximaTerca(
        `${diaTerca} de ${mesTerca.toUpperCase()} de ${anoTerca}`
      );
    }
  }, []);

  const workSituationQuestions = {
    0: "Apresentou comprovante de trabalho lícito: SIM",
    1: "Apresentou comprovante de trabalho lícito: NÃO",
    2: "Não está trabalhando - foi encaminhado para FUNAC",
    3: "Dispensa legal",
    4: "Apresentou comprovante da impossibilidade de trabalhar: SIM",
    5: "Apresentou comprovante da impossibilidade de trabalhar: NÃO",
  } as const;

  const firstSignatureQuestions = {
    0: `É a Primeira Assinatura: SIM - Orientado a comparecer na SALA DE REINTEGRAÇÃO SOCIAL na data ${proximaTerca} às 09h00min e juntar o comprovante no processo.`,
    1: "É a Primeira Assinatura: NÃO",
  } as const;

  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Carregando...</div>;
  if (!isSignedIn) return <div>Usuário não está logado</div>;
  if (!data) return <p className="text-center mt-10">Carregando dados...</p>;

  return (
    <div
      style={{ width: "21cm" }}
      className="p-4 mx-auto text-black print:text-black print:p-0 print:m-0 print:max-w-full leading-relaxed print:border-none border text-ms"
    >
      {/* Cabeçalho */}
      <div className="flex justify-center items-center gap-2 mb-12">
        <Image
          className="border"
          src="/logoGov.svg"
          alt="logo gov"
          width={200}
          height={40}
          priority
        />
        <Image
          className="border"
          src="/logoFunac.svg"
          alt="logo funac"
          width={150}
          height={40}
          priority
        />
      </div>

      {/* Título */}
      <h2 className="font-bold text-center mb-2">TERMO DE COMPARECIMENTO</h2>

      <p className="mb-4">
        No dia <strong>{dataAtual}</strong>, na Fundação Nova Chance – FUNAC,
        compareceu espontaneamente o(a) Senhor(a) acima qualificado(a), para
        assinatura do termo de comparecimento obrigatório e informar trabalho
        lícito e endereço atualizado:
      </p>

      {/* Dados */}
      <div className="mb-2 uppercase">
        <ul>
          <li>
            <strong>Nome:</strong> {data.name}
          </li>
          <li>
            <strong>Nome da Mãe:</strong> {data.mothersName}
          </li>
          <li>
            <strong>CPF:</strong> {data.cpf ? formatCPF(data.cpf) : ""}
          </li>
          <li>
            <strong>Telefone:</strong>{" "}
            {data.telephone ? formatTelefone(data.telephone) : ""}
          </li>
          <li>
            <strong>Endereço:</strong> {data.address}
          </li>
        </ul>
      </div>

      {/* Situação de trabalho */}
      <div className="mt-2 font-semibold">
        {workSituationQuestions[data.workSituation] ??
          "Situação não identificada"}
      </div>

      {/* Admoestação */}
      <div>
        <p className="mt-4 font-semibold">ADMOESTAÇÃO:</p>
        <p className="mb-4">
          Ciente da obrigatoriedade de apresentação do comprovante de trabalho e
          de endereço atualizado, de procurar a equipe técnica da FUNAC para
          acessar vagas de trabalho e qualificação profissional, sob pena de
          consequências como a não concessão de benefícios, progressão ou
          regressão de regime.
        </p>
      </div>

      {/* Primeira assinatura */}
      <div className="mt-2 font-semibold">
        {firstSignatureQuestions[data.firstSignature] ??
          "Situação não identificada"}
      </div>

      {/* Finalização */}
      <div className="my-2">
        <p>
          Nada mais havendo a declarar, lavrou-se o presente termo, que vai por
          mim assinado e pelo(a) comparecente, para que produza os efeitos
          legais cabíveis.
        </p>
      </div>

      {/* Assinatura */}
      <div className="flex my-4">
        <span className="whitespace-nowrap">Assinatura por extenso:</span>
        <div className="border-b border-black w-full"></div>
      </div>

      {/* Observação */}
      <p className="italic text-ms text-center font-bold">
        COMPARECIMENTO: Letras A I- de 01 a 14ª e letras J a Z, de 15 a 30/31 do
        mês - Serão distribuídas 250 senhas diárias – NÃO DEIXE PARA A ÚLTIMA
        HORA
      </p>

      {/* Rodapé */}
      <div className="mt-6 text-center text-ms">
        <p>
          CUIABÁ, {dataAtual} às {horaAtual}
        </p>
        <p className="mt-2 font-bold capitalize">
          {user.firstName} {user.lastName}
        </p>
        <p>Depen</p>
      </div>
    </div>
  );
}
