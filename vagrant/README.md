# 📊 Monitoramento com Netdata

Documentação de monitoramento da infraestrutura virtualizada do projeto **API de Acessórios - Gestão de Configuração II**.

---

## 📖 O que é o Netdata?

O [Netdata](https://www.netdata.cloud/) é uma ferramenta **open-source** de monitoramento em tempo real para servidores e aplicações. Ele coleta métricas de CPU, memória, disco, rede, processos e muito mais, exibindo tudo em um **dashboard web interativo** com gráficos dinâmicos atualizados a cada segundo.

---

## 🚀 Como Acessar o Dashboard

Após provisionar a infraestrutura e executar o playbook de monitoramento, o dashboard do Netdata estará disponível em:

```
http://192.168.56.20:19999
```

> **Nota:** O IP `192.168.56.20` corresponde à **VM2 (Servidor Backend)**, onde o Netdata está instalado. Se o port forwarding estiver configurado no Vagrantfile, você também pode acessar via `http://localhost:19999`.

### Interface do Mailhog (E-mails de Alerta)

Para visualizar os e-mails de alerta enviados pelo Netdata, acesse a interface web do Mailhog:

```
http://192.168.56.20:8025
```

> O Mailhog é um servidor SMTP local para testes. Ele captura todos os e-mails enviados sem entregá-los de fato, permitindo verificar o conteúdo dos alertas em um ambiente seguro.

---

## 📈 Painéis Disponíveis no Dashboard

Ao acessar o dashboard do Netdata, você encontrará os seguintes painéis principais:

| Painel | Descrição |
|---|---|
| **System Overview** | Visão geral do sistema com métricas resumidas |
| **CPU** | Uso de CPU por core, processos do sistema, usuário e I/O wait |
| **Memory** | Uso de memória RAM, swap, cache e buffers |
| **Disks** | I/O de disco, throughput de leitura/escrita, utilização |
| **Network** | Tráfego de rede por interface (bytes enviados/recebidos) |
| **Processes** | Processos em execução, forks, estados dos processos |
| **Applications** | Agrupamento de métricas por aplicação (Node.js, PM2, etc.) |
| **Alarms** | Lista de alertas configurados e seus estados atuais |

### Navegação

- Use o **menu lateral esquerdo** para navegar entre categorias
- Clique em qualquer gráfico para **ampliar** o período de tempo
- Use o **seletor de tempo** no topo para ajustar o intervalo exibido
- Acesse **Alarms** no menu para ver alertas ativos e histórico

---

## ⚠️ Alerta de CPU Configurado

O sistema está configurado com um alerta que dispara quando o **uso de CPU atinge 80%** ou mais por 1 minuto:

| Nível | Condição | Ação |
|---|---|---|
| **Warning** ⚠️ | CPU ≥ 80% | Alerta amarelo no dashboard + envio de e-mail |
| **Critical** 🔴 | CPU ≥ 95% | Alerta vermelho no dashboard + envio de e-mail |

Os e-mails de alerta são enviados para o **Mailhog** (SMTP local), e podem ser visualizados na interface web em `http://192.168.56.20:8025`.

---

## 🧪 Como Testar o Alerta de CPU

Para forçar o uso de CPU e testar o disparo do alerta, utilize a ferramenta **stress-ng**:

### 1. Acessar a VM2

```bash
vagrant ssh vm2
```

### 2. Executar o stress-ng

```bash
# Estressa todos os cores da CPU por 2 minutos
stress-ng --cpu 0 --timeout 120s
```

### 3. Observar o Alerta

1. Abra o dashboard do Netdata em `http://192.168.56.20:19999`
2. Navegue até a seção **CPU** — os gráficos mostrarão o uso em ~100%
3. Após aproximadamente **1 minuto**, o alerta `cpu_usage_high` será disparado
4. Um **banner de alerta** aparecerá no topo do dashboard
5. Acesse **Alarms** no menu lateral para ver os detalhes do alerta
6. Verifique a interface do Mailhog em `http://192.168.56.20:8025` para confirmar o recebimento do e-mail de notificação

### 4. Parar o stress-ng

O processo para automaticamente após o timeout de 120 segundos. Para parar manualmente:

```bash
# Pressione Ctrl+C ou em outro terminal:
sudo killall stress-ng
```

Após a CPU voltar ao normal por 5 minutos, o alerta será resolvido automaticamente.

---

## 🛠️ Comandos Úteis

### Verificar status dos serviços

```bash
# Status do Netdata
sudo systemctl status netdata

# Status do Mailhog
sudo systemctl status mailhog
```

### Reiniciar serviços

```bash
# Reiniciar Netdata (após alterar configurações)
sudo systemctl restart netdata

# Reiniciar Mailhog
sudo systemctl restart mailhog
```

### Verificar alertas via CLI

```bash
# Listar alertas ativos do Netdata
curl -s http://localhost:19999/api/v1/alarms | python3 -m json.tool
```

### Verificar logs

```bash
# Logs do Netdata
sudo journalctl -u netdata -f

# Logs de envio de e-mail (msmtp)
sudo tail -f /var/log/msmtp.log
```

---

## 📋 Arquitetura de Monitoramento

```
┌─────────────────────────────────────────────┐
│                  VM2 (Backend)              │
│              192.168.56.20                  │
│                                             │
│  ┌─────────────┐    ┌──────────────────┐    │
│  │   Netdata    │───▶│   Dashboard Web  │    │
│  │  (coleta)    │    │   porta 19999    │    │
│  └──────┬───────┘    └──────────────────┘    │
│         │ alerta CPU ≥ 80%                  │
│         ▼                                    │
│  ┌─────────────┐    ┌──────────────────┐    │
│  │    msmtp     │───▶│    Mailhog       │    │
│  │ (sendmail)   │    │  SMTP: 1025      │    │
│  └─────────────┘    │  Web:  8025      │    │
│                      └──────────────────┘    │
│                                             │
│  ┌─────────────┐                            │
│  │  stress-ng   │  (teste de estresse)      │
│  └─────────────┘                            │
│                                             │
│  ┌─────────────┐                            │
│  │  API Node.js │  (aplicação monitorada)   │
│  │  porta 8080  │                           │
│  └─────────────┘                            │
└─────────────────────────────────────────────┘
```

---

## 👨‍💻 Autor

Desenvolvido por **Victor Gabriel Dias Machado** — Gestão de Configuração II.
