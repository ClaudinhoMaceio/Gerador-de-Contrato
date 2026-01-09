# 📄 Gerador de Contrato CSMM APPS - PWA

Sistema moderno para geração de contratos de prestação de serviços em PDF, desenvolvido como Progressive Web App (PWA) com suporte offline completo.

## ✨ Funcionalidades

- ✅ **PWA Completo**: Instalável como app nativo
- ✅ **Funciona Offline**: Service Worker para cache de recursos
- ✅ **Compatível com iOS**: Suporte completo para iPhone/iPad
- ✅ **Design Moderno 2026**: Interface com glassmorphism e animações
- ✅ **Responsivo**: Adaptado para todos os dispositivos
- ✅ **Geração de PDF**: Contratos profissionais com jsPDF
- ✅ **Validação de Formulários**: CPF/CNPJ, valores monetários
- ✅ **Integração WhatsApp**: Envio automático do contrato

## 🚀 Como Usar

### Instalação Local

1. Baixe todos os arquivos do projeto
2. Coloque em um servidor web (Apache, Nginx, ou servidor local)
3. Acesse `index.html` no navegador

### Instalação como PWA

#### Android (Chrome/Edge):
1. Abra o site no navegador
2. Toque no menu (3 pontos) → "Adicionar à tela inicial"
3. Ou aguarde o banner de instalação aparecer

#### iOS (Safari):
1. Abra o site no Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Selecione "Adicionar à Tela de Início"
4. Confirme a instalação

## 📱 Recursos PWA

- **Offline First**: Funciona sem internet após primeira visita
- **Instalação Rápida**: Adicione à tela inicial em segundos
- **Experiência Nativa**: Parece um app nativo
- **Atualizações Automáticas**: Service Worker atualiza em background

## 🛠️ Tecnologias

- HTML5
- CSS3 (Glassmorphism, Animações)
- JavaScript (Vanilla)
- jsPDF (Geração de PDF)
- Service Worker API
- Web App Manifest

## 📋 Estrutura de Arquivos

```
client/
├── index.html          # Página principal
├── manifest.json       # Manifest do PWA
├── sw.js              # Service Worker
├── .htaccess          # Configuração Apache (opcional)
└── README.md          # Este arquivo
```

## 🔧 Configuração do Servidor

### Apache (.htaccess já incluído)
O arquivo `.htaccess` já está configurado para:
- Cache adequado do Service Worker
- MIME types corretos
- Headers de segurança

### Nginx
Adicione ao seu `nginx.conf`:
```nginx
location /sw.js {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires "0";
}

location /manifest.json {
    add_header Content-Type "application/manifest+json";
}
```

## 📝 Uso do Sistema

1. Preencha os campos do formulário:
   - Nome/Razão Social
   - CPF/CNPJ
   - Valor do Contrato
   - Prazo (1 a 5 anos)
   - WhatsApp (opcional)

2. Clique em "Gerar Contrato em PDF"

3. O PDF será baixado automaticamente

4. Se WhatsApp foi informado, abrirá automaticamente para envio

## 🌐 Compatibilidade

- ✅ Chrome/Edge (Android/Desktop)
- ✅ Safari (iOS/macOS)
- ✅ Firefox
- ✅ Opera
- ✅ Samsung Internet

## 🔒 Segurança

- Headers de segurança configurados
- Validação de formulários no cliente
- Service Worker com cache seguro

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com CSMM APPS.

---

**Desenvolvido por CSMM APPS** 🚀
