# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Usar a imagem oficial do Ubuntu 22.04 LTS (Jammy Jellyfish)
  config.vm.box = "ubuntu/jammy64"

  # ==========================================
  # CONFIGURAÇÃO DA VM1 (Máquina Cliente)
  # ==========================================
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1"
    
    # Definir um endereço IPv4 privado (Classe C)
    vm1.vm.network "private_network", ip: "192.168.56.10"

    # Configuração de recursos no provedor VirtualBox
    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "VM1-Client"
      vb.memory = "1024" # 1024 MB de memória principal
      vb.cpus = 1
    end
  end

  # ==========================================
  # CONFIGURAÇÃO DA VM2 (Servidor do Backend)
  # ==========================================
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2"

    # Definir um endereço IPv4 privado (Classe C)
    vm2.vm.network "private_network", ip: "192.168.56.20"

    # Sincronizar a pasta da sua aplicação com a pasta vagrant_data dentro da VM2
    vm2.vm.synced_folder ".", "/home/vagrant/vagrant_data"

    # Configuração de recursos no provedor VirtualBox
    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "VM2-Backend"
      vb.memory = "1024" # 1024 MB definidos para a execução estável do backend Node.js
      vb.cpus = 1
    end

    # Provisionamento da VM2: instalar dependências e executar a aplicação
    vm2.vm.provision "shell", inline: <<-SHELL
      echo "=== Iniciando provisionamento da VM2 ==="
      
      # Evitar prompts interativos durante a instalação de pacotes
      export DEBIAN_FRONTEND=noninteractive

      # Atualizar o gerenciador de pacotes
      sudo apt-get update -y

      # Instalar dependências de sistema necessárias
      sudo apt-get install -y curl build-essential git

      # Adicionar repositório do Node.js v20.x (LTS estável)
      echo "=== Instalando Node.js e NPM ==="
      curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
      sudo apt-get install -y nodejs

      # Verificar versões instaladas
      node -v
      npm -v

      # Instalar o PM2 globalmente para gerenciar o processo da aplicação em background
      sudo npm install -g pm2

      # Acessar a pasta sincronizada da aplicação
      cd /home/vagrant/vagrant_data

      # Configurar arquivo de variáveis de ambiente .env
      echo "=== Configurando variáveis de ambiente ==="
      if [ ! -f .env ]; then
        if [ -f .env.example ]; then
          cp .env.example .env
        else
          echo "SERVER_PORTA=8080" > .env
        fi
      fi

      # Garantir que a porta correta esteja configurada no .env
      sed -i 's/SERVER_PORTA=.*/SERVER_PORTA=8080/g' .env
      # Se a variável não estiver no arquivo por algum motivo, adicioná-la
      if ! grep -q "SERVER_PORTA" .env; then
        echo "SERVER_PORTA=8080" >> .env
      fi

      # Instalar dependências da aplicação Node.js
      echo "=== Instalando dependências do projeto ==="
      npm install

      # Parar instâncias anteriores se houver, e iniciar a aplicação com PM2
      echo "=== Iniciando o servidor backend com PM2 ==="
      pm2 delete api-acessorios || true
      pm2 start src/server.js --name api-acessorios

      # Salvar a lista de processos para iniciar junto com o sistema
      pm2 save
      
      echo "=== Provisionamento da VM2 concluído com sucesso! Servidor rodando na porta 8080 ==="
    SHELL
  end
end
