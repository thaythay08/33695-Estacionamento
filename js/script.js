// POST – Registrar entrada 

const API_POST_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/entry';
const API_GET_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/time/';
const API_EXIT_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/exit/';
const API_CHECK_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/check/';
const API_UPDATE_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/update/';
const API_CANCEL_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/cancel/';

document.getElementById('carForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const model = document.getElementById('model').value;
    const plate = document.getElementById('plate').value;

    const carro = {
        modelo: model,
        placa: plate,
    };

    fetch( API_POST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plate: plate, model: model })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').textContent = 'Carro registrado com sucesso!';
    })
    .catch(error => {
        document.getElementById('resultado').textContent = 'Erro ao registrar carro.';
        console.error('Erro:', error);
    });
});

// GET – Consultar tempo de permanência
document.getElementById('tempoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tempoPlate = document.getElementById('tempoPlate').value;

    fetch(API_GET_URL + tempoPlate)
        .then(response => {
            if (!response.ok) {
                throw new Error('Placa não encontrada ou erro na requisição.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta da API:', data); 
            document.getElementById('tempo').textContent = `Tempo de permanência: ${data.parkedTime.toFixed(2)}`;
        })
        .catch(error => {
            document.getElementById('tempo').textContent = 'Erro ao consultar tempo de permanência.';
            console.error('Erro:', error);
        });
});

// PATCH – Registrar saída
document.getElementById('saidaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const saidaPlate = document.getElementById('saidaPlate').value;

    fetch(API_EXIT_URL + saidaPlate, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao registrar saída.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('saidaResultado').textContent = 'Saída registrada com sucesso!';
        console.log('Resposta da saída:', data);
    })
    .catch(error => {
        document.getElementById('saidaResultado').textContent = 'Erro ao registrar saída.';
        console.error('Erro:', error);
    });
});

// GET - Verificar carro
document.getElementById('checkForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const checkPlate = document.getElementById('checkPlate').value;

    fetch(API_CHECK_URL + checkPlate)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao verificar placa.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Para debug
            const estaEstacionado = data.entryTime ? 'SIM' : 'NÃO';
            document.getElementById('checkResultado').textContent = `Está no estacionamento? ${estaEstacionado}`;
        })
        .catch(error => {
            document.getElementById('checkResultado').textContent = 'Erro ao verificar veículo.';
            console.error('Erro:', error);
        });
});

// PUT - Atualizar dados
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const plate = document.getElementById('updatePlate').value;
    const model = document.getElementById('updateModel').value;

    fetch(API_UPDATE_URL + plate, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plate: plate, model: model })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar o veículo.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('updateResult').textContent = 'Veículo atualizado com sucesso!';
    })
    .catch(error => {
        document.getElementById('updateResult').textContent = 'Erro ao atualizar veículo.';
        console.error('Erro:', error);
    });
});

// DELETE - Cancelar registro
document.getElementById('cancelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const plate = document.getElementById('cancelPlate').value;

    fetch(API_CANCEL_URL + plate, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cancelar registro.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('cancelResult').textContent = 'Registro cancelado com sucesso!';
    })
    .catch(error => {
        document.getElementById('cancelResult').textContent = 'Erro ao cancelar registro.';
        console.error('Erro:', error);
    });
});


// Toast config
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-bottom-right',
  timeOut: '4000',
};

// Toast config
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-bottom-right',
  timeOut: '4000',
};

// Loader
function showLoader() {
  document.getElementById('loader').style.display = 'block';
}
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// Modo escuro
document.getElementById('toggleDarkMode').addEventListener('click', () => {
  document.body.classList.toggle('modo-escuro');
});
