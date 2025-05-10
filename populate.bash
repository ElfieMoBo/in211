#!/bin/bash

curl -X POST -H 'Content-Type: application/json' -d @movie1.json $(import.meta.env.VITE_BACKDEND_URL)/movies/new-list-movies
# curl -X POST -H 'Content-Type: application/json' -d @movie2.json $(import.meta.env.VITE_BACKDEND_URL)/movies/new-list-movies
# curl -X POST -H 'Content-Type: application/json' -d @movie3.json $(import.meta.env.VITE_BACKDEND_URL)/movies/new-list-movies
# curl -X POST -H 'Content-Type: application/json' -d @movie4.json $(import.meta.env.VITE_BACKDEND_URL)/movies/new-list-movies
# curl -X POST -H 'Content-Type: application/json' -d @movie5.json $(import.meta.env.VITE_BACKDEND_URL)/movies/new-list-movies
