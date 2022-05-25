from multiprocessing import context
from queue import PriorityQueue
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

MyMap=''

def show_map_form(request):
    return render(request,'base/input_data.html')

def show_best_way(request):
    source=request.POST['source']
    destination=request.POST['destination']
    MyMap=request.POST['MyMap']

    
    

def a_star(source, destination):
    straight_line = {
        'Arad': 366,
        'Zerind': 374,
        'Oradea': 380,
        'Sibiu': 253,
        'Fagaras': 176,
        'Rimniciu Vilcea': 193,
        'Timisoara': 329,
        'Lugoj': 244,
        'Mehadia': 241,
        'Dorbeta': 242,
        'Pitesti': 100,
        'Craiova': 160,
        'Bucharest': 0,
        'Giurgiu': 77,
        'Urziceni': 80,
        'Vaslui': 199,
        'Lasi': 226,
        'Neamt': 234,
        'Hirsova': 151,
        'Eforie': 161
    } 
    p_q,visited = PriorityQueue(),{}
    p_q.put((straight_line[source], 0, source, [source]))
    visited[source] = straight_line[source]
    while not p_q.empty():
        (heuristic, cost, vertex, path) = p_q.get()
        print('Queue Status:',heuristic, cost, vertex, path)
        if vertex == destination:
           return heuristic, cost, path
        for next_node in GRAPH[vertex].keys():
            current_cost = cost + GRAPH[vertex][next_node]
            heuristic = current_cost + straight_line[next_node]
            if not next_node in visited or visited[next_node] >= heuristic:
                visited[next_node] = heuristic
                p_q.put((heuristic, current_cost, next_node,path + [next_node]))


def main():
    print('Source :', end=' ')
    source = input().strip()
    print('Destination :', end=' ')
    goal = input().strip()
    if source not in MyMap or goal not in MyMap:
        print('CITY DOES NOT EXIST.')
    else:
        heuristic, cost, optimal_path = a_star(source, goal)
        print('min of total heuristic_value =', heuristic)
        print('total min cost =', cost)
        print('\nRoute:')
        print(' -> '.join(city for city in optimal_path))
    return render(request,'base/best_way.html')
