import 'dart:io';

void main(List<String> arguments) {
  int count = 0;
  while (true) {
    sleep(Duration(microseconds: 500));
    print('debugging - ${count++}');
  }
}
