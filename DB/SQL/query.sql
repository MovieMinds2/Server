-- 평균 평점
select round( AVG(rank_score),2 )as "averRank" from review group by movie_id;
