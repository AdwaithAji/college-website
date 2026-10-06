package com.example.college.rankholders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface RankRepository extends JpaRepository<RankHolders, Long> {

    
}
