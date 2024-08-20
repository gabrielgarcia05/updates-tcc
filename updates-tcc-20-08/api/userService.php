<?php

namespace App\Services;

class userService
{
    protected $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function createUser($nome, $email, $senha, $data_nasc)
    {
        $stmt = $this->db->prepare("INSERT INTO usuarios (nome, email, senha, data_nasc) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nome, $email, $senha, $data_nasc);

        if ($stmt->execute()) {
            return ['message' => 'Usuário cadastrado com sucesso!'];
        } else {
            return ['error' => $stmt->error];
        }
    }

    public function getUsers()
    {
        $stmt = $this->db->prepare("SELECT * FROM usuarios");
        $stmt->execute();
        $result = $stmt->get_result();
        $usuarios = [];

        while ($row = $result->fetch_assoc()) {
            $row['data_nasc'] = date('Y-m-d', strtotime($row['data_nasc']));
            $usuarios[] = $row;
        }

        return $usuarios;
    }

    public function getUserById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $usuario = $result->fetch_assoc();

        if ($usuario) {
            $usuario['data_nasc'] = date('Y-m-d', strtotime($usuario['data_nasc']));
        }

        return $usuario;
    }

    public function updateUser($id, $nome, $email, $senha, $data_nasc)
    {
        $stmt = $this->db->prepare("UPDATE usuarios SET nome=?, email=?, senha=?, data_nasc=? WHERE id=?");
        $stmt->bind_param("ssssi", $nome, $email, $senha, $data_nasc, $id);

        if ($stmt->execute()) {
            return ['message' => 'Usuário atualizado com sucesso!'];
        } else {
            return ['error' => $stmt->error];
        }
    }

    public function deleteUser($id)
    {
        $stmt = $this->db->prepare("DELETE FROM usuarios WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            return ['message' => 'Usuário excluído com sucesso!'];
        } else {
            return ['error' => $stmt->error];
        }
    }
}
