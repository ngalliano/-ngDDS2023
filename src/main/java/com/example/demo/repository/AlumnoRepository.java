package com.example.demo.repository;

import java.util.List;
//import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Alumno;
import com.example.demo.entity.Tema;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
	void save(Optional<Alumno> AlumnoToUpdate);
	
	List<Alumno> findByNombre(String nombre);
	List<Alumno> findByNombreLike(String nombre);
}