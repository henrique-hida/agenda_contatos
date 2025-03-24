-- clientes
INSERT INTO cliente (id, nome, cpf, data_nascimento, endereco) VALUES
(31, 'Carlos Ferreira', '637.847.700-02', '1980-04-10', 'Rua das Flores, 100'),
(32, 'Mariana Souza', '582.475.170-60', '2004-04-10', 'Avenida Central, 200'),
(37, 'Eduardo Lima', '074.293.039-43', '1010-12-18', 'Rua das Palmeiras, 300'),
(38, 'Roberto Silva', '648.804.650-03', '2005-12-18', 'Rua dos Pinheiros, 400'),
(39, 'Ana Oliveira', '317.145.680-08', '2009-06-02', 'Avenida Paulista, 500'),
(40, 'Juliana Mendes', '534.641.690-06', '1010-10-10', 'Rua da Liberdade, 600'),
(41, 'Tech Solutions', '461.016.290-31', '1313-12-13', 'Avenida das Indústrias, 700'),
(42, 'João Pereira', '123.456.789-02', '1990-01-01', 'Rua Exemplo, 123'),
(33, 'Marcos Almeida', '926.742.360-60', '1010-10-10', 'Avenida do Comércio, 800'),
(43, 'Lucas Almeida', '578.347.124-01', '1985-11-22', 'Rua do Sol, 700'),
(44, 'Fernanda Costa', '658.394.178-32', '1992-02-15', 'Avenida Brasil, 900'),
(45, 'Paula Martins', '735.284.320-45', '2000-06-30', 'Rua das Acácias, 1100'),
(46, 'Rafael Oliveira', '820.236.507-60', '1988-09-05', 'Avenida Nova, 1200');

-- contatos
INSERT INTO contato (id, cliente_id, tipo, valor, observacao) VALUES
(35, 31, 'email', 'carlosferreira@email.com', 'email pessoal'),
(36, 32, 'email', 'mariana.souza@email.com', 'não me chame'),
(43, 37, 'telefone', '11969450912', 'telefone pessoal'),
(44, 37, 'email', 'eduardolima@email.com', 'email'),
(46, 38, 'telefone', '11969450913', 'contato secundário'),
(47, 39, 'telefone', '11969450914', 'whatsapp'),
(48, 39, 'email', 'ana.oliveira@email.com', 'email pessoal'),
(52, 39, 'telefone', '11091824098', 'telefone comercial'),
(49, 40, 'telefone', '1147351180', 'telefone fixo'),
(50, 41, 'email', 'techsolutions@email.com', 'empresarial'),
(51, 42, 'email', 'joaopereira@email.com', 'Contato principal'),
(53, 43, 'email', 'lucasalmeida@email.com', 'email principal'),
(54, 43, 'telefone', '11987654321', 'telefone pessoal'),
(55, 44, 'email', 'fernanda.costa@email.com', 'email pessoal'),
(56, 44, 'telefone', '11986543210', 'telefone de contato'),
(57, 45, 'email', 'paula.martins@email.com', 'email profissional'),
(58, 45, 'telefone', '11983210987', 'whatsapp'),
(59, 46, 'email', 'rafael.oliveira@email.com', 'contato corporativo'),
(60, 46, 'telefone', '11982374567', 'telefone comercial');
