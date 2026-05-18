# Ergofly — Landing Page

LP de conversão pra Ergofly (sistema de IA em ergonomia da Doutor Fly).
Cliente: ProfitPró.

## Stack

- HTML + CSS + JS puro
- Tailwind CSS via CDN
- Google Fonts (Inter)
- Sem build, sem npm

## Como rodar localmente

Abra `index.html` no navegador. Só isso. Não precisa servidor.

Pra ver o reload automático ao editar, use a extensão **Live Server** no VS Code (botão direito no arquivo → "Open with Live Server").

## Estrutura

```
ergofly website claude code/
├── index.html              # página principal (5 seções)
├── styles.css              # CSS custom em cima do Tailwind
├── script.js               # Meta Pixel + interações
├── assets/
│   └── logo-doutor-fly.svg # logo vetor
├── README.md
└── .gitignore
```

## Deploy

GitHub → Vercel. Vercel detecta HTML estático e serve direto sem configuração.

1. `git init` na pasta
2. Criar repo no GitHub e dar push
3. Conectar repo ao Vercel (vercel.com → New Project → Import)
4. Vercel faz deploy automático a cada push na branch `main`

## Pendências antes de ir pra produção

- [ ] URL do VSL (YouTube/Vimeo) — trocar placeholder no Hero
- [ ] ID do Meta Pixel — em `script.js`
- [ ] Destino do botão CTA (form externo / WhatsApp / etc) — trocar `href="#"` nos botões
- [ ] CNPJ da Doutor Fly — placeholder no footer
- [ ] Email comercial real — confirmar `contato@doutorfly.com.br`
- [ ] URL da Política de Privacidade — trocar `#` no footer
- [ ] Domínio definitivo (subdomínio ou próprio)

## Cores da marca

- Vinho (primária): `#9E1F5A`
- Sage (secundária): `#7DB5AC`
- Vinho escuro: `#7A1746`
- Sage escuro: `#5A8E86`
- Sage claro: `#F4F9F8`
