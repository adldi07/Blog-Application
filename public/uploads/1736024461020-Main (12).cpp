/* 
  Driver code::
 -- Adesh Kumar 
 -- ad_ldi07
*/

#include<bits/stdc++.h>
#define int long long

typedef long long ll;
typedef long double dd;

using namespace std;

int MOD = 1e9 + 7;

int fun(int n , int ans ){
  if(n==0){
    return 1;
  }
  
  if(n%2==1){
    return (ans * fun ( n/2 , (ans * ans)%MOD ))%MOD;
  }
  return fun(n/2 , (ans * ans)% MOD )%MOD;
  
}

void JSS(){
  
  int n;
  cin>>n;
  cout<<fun(n, 2);
  
}

int32_t main(){
  ios::sync_with_stdio(false);
  cin.tie(0);
  
  int t = 1;
  
  // cin>>t;
  
  while(t--){
    JSS();
    cout<<endl;
  }
  
  return 0;
}