"use client";

import { useState } from "react";

const WHATS = "5521975130256";

type Produto = {
  id: number;
  nome: string;
  cat: string;
  preco: number;
  img: string;
};

const produtos: Produto[] = [
  { id: 1, nome: "Bermuda Jeans Clara Destroyed", cat: "JEANS", preco: 129.9, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" },
  { id: 2, nome: "Bermuda Jeans Preta Premium", cat: "JEANS", preco: 139.9, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80" },
  { id: 3, nome: "Bermuda Tactel Mauricinho Preta", cat: "TACTEL", preco: 79.9, img: "https://images.unsplash.com/photo-1565693413573-fcfc4ddc97a0?w=600&q=80" },
  { id: 4, nome: "Bermuda Tactel Azul", cat: "TACTEL", preco: 79.9, img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80" },
  { id: 5, nome: "Camiseta Dry-Fit Azul DALA", cat: "DRY-FIT", preco: 99.9, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" },
  { id: 6, nome: "Calça Jeans Slim Black", cat: "JEANS", preco: 219.9, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80" },
  { id: 7, nome: "Kit 3 Tactel DALA", cat: "KIT", preco: 199.9, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80" },
  { id: 8, nome: "Camiseta Oversized Preta", cat: "MULTIMARCAS", preco: 89.9, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80" },
];

const categorias = ["TODOS", "JEANS", "TACTEL", "DRY-FIT", "MULTIMARCAS", "KIT"];
const moeda = (valor: number) => valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function DALA() {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [aba, setAba] = useState("TODOS");

  const total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
  const filtrados = aba === "TODOS" ? produtos : produtos.filter((produto) => produto.cat === aba);

  const finalizar = () => {
    if (carrinho.length === 0) {
      window.alert("Adicione produtos!");
      return;
    }

    const texto = `Olá DALA MULTIMARCAS!\n\nQuero finalizar meu pedido:\n${carrinho
      .map((produto) => `• ${produto.nome} - R$ ${moeda(produto.preco)}`)
      .join("\n")}\n\nTotal: R$ ${moeda(total)}\nForma: Pix`;

    window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-[#06060E] pb-24 text-white">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#1e1e2e] bg-[#06060E] p-4">
        <h1 className="shrink-0 text-2xl font-black">
          DA<span className="text-[#2F80ED]">LA</span>
          <small className="ml-2 text-[9px] font-light tracking-[5px]">MULTIMARCAS</small>
        </h1>
        <nav aria-label="Filtrar produtos" className="flex gap-2 overflow-x-auto">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              onClick={() => setAba(categoria)}
              aria-pressed={aba === categoria}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold ${aba === categoria ? "bg-[#2F80ED]" : "bg-[#151525] text-zinc-400"}`}
            >
              {categoria}
            </button>
          ))}
        </nav>
      </header>

      <section aria-label="Produtos" className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
        {filtrados.map((produto) => (
          <article key={produto.id} className="rounded-2xl border border-[#1e1e2e] bg-[#10101E] p-2">
            <img src={produto.img} className="h-48 w-full rounded-xl object-cover" alt={produto.nome} />
            <h2 className="mt-2 min-h-10 text-sm font-bold">{produto.nome}</h2>
            <p className="font-black text-[#2F80ED]">R$ {moeda(produto.preco)}</p>
            <button
              type="button"
              onClick={() => setCarrinho((itens) => [...itens, produto])}
              className="mt-2 w-full rounded-full bg-white py-2.5 text-xs font-black text-black"
            >
              ADICIONAR
            </button>
          </article>
        ))}
      </section>

      <button
        type="button"
        onClick={finalizar}
        className="fixed bottom-4 right-4 z-30 rounded-full bg-[#25D366] px-6 py-4 font-black text-white shadow-2xl"
      >
        WhatsApp {carrinho.length} - R$ {moeda(total)}
      </button>
    </main>
  );
}
