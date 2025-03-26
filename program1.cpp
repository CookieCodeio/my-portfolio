#include<iostream>
using namespace std;
class bankAccount {
    private:
        string accountHolderName;
        int accountNumber;
        float balance;
    public:
        void userinfo(string name, int accno, float bal){
            accountHolderName = name;
            accountNumber=accno;
            balance = bal;
        }
        void deposite(int damount){
            balance+=damount;
        }
        void withdraw(int wamount){
            if(balance<wamount){
                    cout<<"Unable to withdraw!\n";
            }
            balance-=damount;
        }

};
int main(){
    string p1name,p2name,p3name;
    int p1accno,p2accno,p3accno;
    float p1damount,p2wamount,p1bal, p2bal,p3bal;

    bankAccount person1;
    bankAccount person2;
    bankAccount person3;

    cout<<"Bank Account details:-\n\n";

    cout<<"Enter Person1 name,account no, balance";
    cin>>p1name>>p1accno>>p1bal;
    person1.userinfo(p1name,p1accno,p1bal);

    cout<<"Enter Person1 name,account no, balance";
    cin>>p2name>>p2accno>>p2bal;
    person1.userinfo(p2name,p2accno,p2bal);

    cout<<"Enter Person1 name,account no, balance";
    cin>>p3name>>p3accno>>p3bal;
    person1.userinfo(p3name,p3accno,p3bal);
// DEPOSITE OPERATION
    cout<<"Enter person 1 Deposite Amount:";
    cin>>p1damount;
    person1.deposite(p1damount);

    cout<<"Enter person 2 Withdraw Amount:";
    cin>>p2wamount;
    person1.deposite(p2wamount);
//DISPLAY CURRENT BALANCE PERSON1

    cout<<"Person1:\n";
    cout<<"Name:">>person1.accountHolderName;
    cout<<"Current Balance:"<<person1.balance;


    return 0;
}