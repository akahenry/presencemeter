import 'package:flutter/material.dart';

import 'package:presencemeter/class.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Presencemeter',
      theme: ThemeData(
        primarySwatch: Colors.teal,
      ),
      home: HomePage(title: 'Presencemeter'),
    );
  }
}

class HomePage extends StatefulWidget {
  HomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Class> classes = [];

  void _addClass() {
    setState(() {
      classes.add(Class(name: "Portugues"));
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Center(
          child: Icon(Icons.library_books),
        ),
        centerTitle: true,
      ),
      body: Center(
          // Center is a layout widget. It takes a single child and positions it
          // in the middle of the parent.
          child: ListView.builder(
        itemBuilder: (context, index) {
          return Padding(
              padding:
                  EdgeInsets.only(left: 50, right: 50, top: 10, bottom: 10),
              child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                  side: BorderSide(color: Colors.black),
                ),
                color: index % 2 == 0
                    ? Color.fromRGBO(209, 204, 220, 1)
                    : Color.fromRGBO(245, 237, 240, 1),
                shadowColor: Colors.grey,
                child: Padding(
                  padding:
                      EdgeInsets.only(left: 5, right: 5, top: 30, bottom: 30),
                  child: Stack(children: <Widget>[
                    Align(
                      alignment: Alignment.centerRight,
                      child: Stack(
                        children: <Widget>[
                          Padding(
                            padding: const EdgeInsets.only(left: 0, top: 5),
                            child: Column(
                              children: <Widget>[
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    Padding(
                                      padding: const EdgeInsets.only(
                                          bottom: 60, right: 60),
                                      child: classes[index].gpsEnabled
                                          ? Icon(
                                              Icons.my_location,
                                              color: Colors.black,
                                              size: 30,
                                            )
                                          : null,
                                    ),
                                    Center(
                                      child: Text(
                                        classes[index].name,
                                        style: TextStyle(
                                            fontFamily: 'rambla',
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16),
                                        textAlign: TextAlign.center,
                                      ),
                                    ),
                                  ],
                                ),
                                classes[index].misses <=
                                        classes[index].maxMisses
                                    ? Icon(
                                        Icons.check,
                                        color: Colors.green,
                                        size: 30,
                                      )
                                    : Icon(Icons.block,
                                        color: Colors.red, size: 30),
                              ],
                            ),
                          ),
                        ],
                      ),
                    )
                  ]),
                ),
              ));
        },
        itemCount: classes.length,
      )),
      floatingActionButton: FloatingActionButton(
        onPressed: _addClass,
        tooltip: 'Add class',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

// class HomePageModalAdd extends StatefulWidget {
//   HomePageModalAdd({key}) : super(key: key);

//   @override
//   _HomePageModalAddState createState() => _HomePageModalAddState();
// }

// class _HomePageModalAddState extends State<HomePageModalAdd> {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       height: MediaQuery.of(context).size.height * 0.5,
//       child: Padding(
//           padding: EdgeInsets.all(10),
//           child: Form(
//             child: Column(
//               children: [
//                 Text(
//                   "Add Class",
//                   style: TextStyle(fontSize: 24),
//                 ),
//                 TextFormField(
//                   decoration: InputDecoration(
//                       labelText: "What is the name of the class?"),
//                 )
//               ],
//             ),
//           )),
//     );
//   }
// }
