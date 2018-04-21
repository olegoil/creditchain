#include "stdafx.h"
#include <iostream>
#include <algorithm>
#include <list>
#include <stack>
#include <string>
#include <cstdio>
#include <vector>

#define NIL -1
#define MAXN 101010

using namespace std;

vector<int> cycles[MAXN];

class Graph {
	int amount;
	list<int> *g;
	int current;
	void BFS(int u, int disc[], int low[], stack<int> *st, bool member[]);
public:
	Graph(int amount);
	void addEdge(int from, int to);
	void findCycles();
	int getCurrent() const;
	~Graph();
};

Graph::Graph(int amount) {
	current = 0;
	this->amount = amount;
	g = new list<int>[amount + 1];
}

void Graph::addEdge(int from, int to) {
	g[from].push_back(to);
}

void Graph::BFS(int u, int disc[], int low[], stack<int> *st, bool member[]) {
	static int time = 0;

	disc[u] = low[u] = ++time;
	st->push(u);
	member[u] = true;

	list<int>::iterator i;
	for (i = g[u].begin(); i != g[u].end(); ++i) {
		int v = *i;

		if (disc[v] == -1) {
			BFS(v, disc, low, st, member);
			low[u] = min(low[u], low[v]);
		}
		else if (member[v] == true)
			low[u] = min(low[u], disc[v]);
	}

	int w = 0;
	if (low[u] == disc[u]) {
		while (st->top() != u) {
			w = (int)st->top();
			cycles[current].push_back(w);
			member[w] = false;
			st->pop();
		}
		w = (int)st->top();

		cycles[current].push_back(w);
		current++;

		member[w] = false;
		st->pop();
	}
}


void Graph::findCycles() {
	int *disc = new int[amount];
	int *low = new int[amount];
	bool *member = new bool[amount];
	stack<int> *st = new stack<int>();

	for (int i = 0; i < amount; i++) {
		disc[i] = NIL;
		low[i] = NIL;
		member[i] = false;
	}

	for (int i = 0; i < amount; i++)
		if (disc[i] == NIL) BFS(i, disc, low, st, member);
}

int Graph::getCurrent() const {
	return current;
}

Graph::~Graph() {
	delete[] g;
}

int value[500][500];

int main() {
	//freopen("test.txt", "r", stdin);
	//freopen("res.txt", "w", stdout);
	int n, m;
	cin >> n >> m;
	Graph g(n + 1);

	for (int i = 0; i < m; i++) {
		int from, to, val;
		cin >> from >> to >> val;
		g.addEdge(from, to);
		value[from][to] = val;
	}

	g.findCycles();
	int sz = g.getCurrent();

	for (int i = 0; i < sz; i++) {
		if (cycles[i].size() > 1) {
			int min_val = 323002032;

			for (int j = cycles[i].size() - 1; j > 0; j--) {
				min_val = min(min_val, value[cycles[i][j]][cycles[i][j - 1]]);
			}

			min_val = min(min_val, value[cycles[i][0]][cycles[i][cycles[i].size() - 1]]);
			cout << "\nMin value in " << i << " cycle: " << min_val << endl;
			cout << endl;
			cout << "Values: " << endl;

			for (int j = cycles[i].size() - 1; j > 0; j--) {
				value[cycles[i][j]][cycles[i][j - 1]] -= min_val;
				cout << cycles[i][j] << " " << cycles[i][j - 1] << " " << value[cycles[i][j]][cycles[i][j - 1]] << endl;
			}

			value[cycles[i][0]][cycles[i][cycles[i].size() - 1]] -= min_val;
			cout << cycles[i][0] << " " << cycles[i][cycles[i].size() - 1] << " " << value[cycles[i][0]][cycles[i][cycles[i].size() - 1]] << endl;
			cout << endl;
		}
	}

	system("pause");
	return 0;
}